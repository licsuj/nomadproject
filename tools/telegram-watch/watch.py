#!/usr/bin/env python3
"""
Telegram alerts for spots.nomadmalta.com, read from Umami Cloud. Runs on the Raspberry Pi.
Python 3 standard library only — nothing to install.

Modes:
  python3 watch.py chatid    print the chat ID(s) of anyone who has messaged your bot
  python3 watch.py test      send a test message
  python3 watch.py scans     QR-scan alert: new sticker visits since the last check (run every 2 min)
  python3 watch.py summary   last 30 minutes, only sends if there were visitors (run every 30 min)
  python3 watch.py daily     last 24 hours, always sends (run once a day)

Settings come from a .env file next to this script (see .env.example).
No visitor IPs or personal data are read or sent — only counts, pages, countries and sticker IDs.
"""
import json, os, sys, time, urllib.parse, urllib.request, urllib.error
from pathlib import Path

HERE = Path(__file__).resolve().parent
STATE = HERE / ".last_scan_check"


def load_env():
    env_file = HERE / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def need(name):
    v = os.environ.get(name, "")
    if not v:
        sys.exit(f"Missing {name}. Add it to {HERE / '.env'}")
    return v


def http_json(url, headers=None, data=None):
    req = urllib.request.Request(url, headers=headers or {}, data=data)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode())


# ---------------- Telegram ----------------
def tg(method, **params):
    token = need("TELEGRAM_BOT_TOKEN")
    data = urllib.parse.urlencode(params).encode() if params else None
    return http_json(f"https://api.telegram.org/bot{token}/{method}", data=data)


def send(text):
    tg("sendMessage", chat_id=need("TELEGRAM_CHAT_ID"), text=text, disable_web_page_preview="true")


# ---------------- Umami ----------------
def umami(path, **params):
    base = os.environ.get("UMAMI_API_BASE", "https://api.umami.is/v1").rstrip("/")
    site = need("UMAMI_WEBSITE_ID")
    qs = urllib.parse.urlencode(params)
    url = f"{base}/websites/{site}/{path}" + (f"?{qs}" if qs else "")
    try:
        return http_json(url, headers={"Authorization": f"Bearer {need('UMAMI_API_KEY')}", "Accept": "application/json"})
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            sys.exit(f"Umami refused the API key ({e.code}). Check UMAMI_API_KEY, and that API access is included in your Umami plan.")
        raise


def window(minutes):
    end = int(time.time() * 1000)
    return end - minutes * 60 * 1000, end


def top(kind, start, end, limit=3):
    rows = umami("metrics", type=kind, startAt=start, endAt=end, limit=limit) or []
    return [(r.get("x") or "(none)", r.get("y", 0)) for r in rows]


def stickers_from_queries(rows):
    """Umami 'query' rows look like ('q=bg1', 3). Return {'bg1': 3}."""
    out = {}
    for q, n in rows:
        vals = urllib.parse.parse_qs(q.lstrip("?")).get("q")
        if vals:
            out[vals[0]] = out.get(vals[0], 0) + n
    return out


def fmt(rows):
    return ", ".join(f"{x} ×{y}" for x, y in rows) if rows else "—"


def report(minutes, label, always):
    start, end = window(minutes)
    s = umami("stats", startAt=start, endAt=end)
    visitors = s.get("visitors", 0)
    if not visitors and not always:
        return  # stay quiet when nobody came
    site = os.environ.get("SITE_NAME", "spots.nomadmalta.com")
    stickers = stickers_from_queries(top("query", start, end, 20))
    lines = [
        f"📍 {site} · {label}",
        f"Visitors {visitors} · page views {s.get('pageviews', 0)}",
        f"QR stickers: {fmt(sorted(stickers.items(), key=lambda kv: -kv[1]))}",
        f"Top pages: {fmt(top('path', start, end))}",
        f"Countries: {fmt(top('country', start, end))}",
        f"Actions: {fmt(top('event', start, end, 6))}",
    ]
    try:
        live = umami("active").get("visitors", 0)
        if live:
            lines.append(f"On the page right now: {live}")
    except Exception:
        pass
    send("\n".join(lines))


def scans():
    now = int(time.time() * 1000)
    try:
        start = int(STATE.read_text())
    except Exception:
        start = now - 2 * 60 * 1000
    stickers = stickers_from_queries(top("query", start, now, 20))
    STATE.write_text(str(now))
    if stickers:
        site = os.environ.get("SITE_NAME", "spots.nomadmalta.com")
        send(f"🔔 QR scan on {site}: " + ", ".join(f"{k} ×{v}" for k, v in stickers.items()))


def chatid():
    res = tg("getUpdates").get("result", [])
    if not res:
        print("No messages yet. Open your bot in Telegram, press Start (or send 'hi'), then run this again.")
        return
    seen = {}
    for u in res:
        msg = u.get("message") or u.get("channel_post") or {}
        chat = msg.get("chat") or {}
        if chat:
            seen[chat["id"]] = chat.get("username") or chat.get("title") or chat.get("first_name")
    for cid, name in seen.items():
        print(f"TELEGRAM_CHAT_ID={cid}    ({name})")


if __name__ == "__main__":
    load_env()
    mode = sys.argv[1] if len(sys.argv) > 1 else "summary"
    if mode == "chatid":
        chatid()
    elif mode == "test":
        send("✅ NomadMalta alerts are connected.")
        print("Sent.")
    elif mode == "scans":
        scans()
    elif mode == "summary":
        report(30, "last 30 min", always=False)
    elif mode == "daily":
        report(24 * 60, "last 24 hours", always=True)
    else:
        sys.exit(__doc__)
