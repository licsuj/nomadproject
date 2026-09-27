#!/usr/bin/env python3
"""
Telegram reports for spots.nomadmalta.com, read from the Pi's own events.db
(filled by collector.py). Python 3 standard library only.

  python3 watch.py chatid    print the chat ID of anyone who messaged your bot
  python3 watch.py test      send a test message
  python3 watch.py summary   last 30 minutes, sends only if there were visits (cron: every 30 min)
  python3 watch.py daily     last 24 hours, always sends (cron: 21:00)
"""
import json, os, sqlite3, sys, time, urllib.parse, urllib.request
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
DB = HERE / "events.db"


def load_env():
    f = HERE / ".env"
    if f.exists():
        for line in f.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def need(name):
    v = os.environ.get(name, "")
    if not v:
        sys.exit(f"Missing {name}. Add it to {HERE / '.env'}")
    return v


def tg(method, **params):
    data = urllib.parse.urlencode(params).encode() if params else None
    with urllib.request.urlopen(f"https://api.telegram.org/bot{need('TELEGRAM_BOT_TOKEN')}/{method}", data=data, timeout=20) as r:
        return json.loads(r.read().decode())


def send(text):
    tg("sendMessage", chat_id=need("TELEGRAM_CHAT_ID"), text=text, disable_web_page_preview="true")


def fmt(counter, n=4):
    return ", ".join(f"{k} ×{v}" for k, v in counter.most_common(n)) or "—"


def rows_since(seconds):
    if not DB.exists():
        return []
    con = sqlite3.connect(DB, timeout=10)
    rows = con.execute("SELECT event, loc, lang, sticker, country, extra FROM events WHERE ts > ?",
                       (int(time.time()) - seconds,)).fetchall()
    con.close()
    return rows


def report(seconds, label, always):
    rows = rows_since(seconds)
    views = [r for r in rows if r[0] == "board_view"]
    if not views and not always:
        return  # quiet when nobody came
    stickers = Counter(r[3] for r in views if r[3])
    langs = Counter({"en": "English", "zh": "Chinese"}.get(r[2], "?") for r in views)
    countries = Counter(r[4] for r in views if r[4])
    actions = Counter(r[0] for r in rows if r[0] != "board_view")
    captions = Counter()
    for r in rows:
        if r[0] == "copy_caption" and r[5]:
            x = json.loads(r[5]); captions[f"#{x.get('caption','?')} {x.get('angle','')}".strip()] += 1
    copies = sum(v for k, v in actions.items() if k.startswith("copy_"))
    rate = f"{round(100 * copies / len(views))}%" if views else "—"
    site = os.environ.get("SITE_NAME", "spots.nomadmalta.com")
    lines = [
        f"📍 {site} · {label}",
        f"Page views {len(views)} · from QR stickers {sum(stickers.values())}",
        f"Stickers: {fmt(stickers)}",
        f"Language: {fmt(langs)} · Countries: {fmt(countries)}",
        f"Copy taps {copies} (≈{rate} of views) · Captions: {fmt(captions, 3)}",
        f"Other actions: {fmt(Counter({k: v for k, v in actions.items() if not k.startswith('copy_')}), 5)}",
    ]
    send("\n".join(lines))


def chatid():
    res = tg("getUpdates").get("result", [])
    if not res:
        print("No messages yet. Open your bot in Telegram, press Start, then run this again.")
    for cid in {(u.get("message") or {}).get("chat", {}).get("id") for u in res} - {None}:
        print(f"TELEGRAM_CHAT_ID={cid}")


if __name__ == "__main__":
    load_env()
    mode = sys.argv[1] if len(sys.argv) > 1 else "summary"
    if mode == "chatid":
        chatid()
    elif mode == "test":
        send("✅ NomadMalta alerts are connected."); print("Sent.")
    elif mode == "summary":
        report(30 * 60, "last 30 min", always=False)
    elif mode == "daily":
        report(24 * 3600, "last 24 hours", always=True)
    else:
        sys.exit(__doc__)
