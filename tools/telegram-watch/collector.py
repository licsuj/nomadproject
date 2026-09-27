#!/usr/bin/env python3
"""
Visit collector for spots.nomadmalta.com. Runs on the Raspberry Pi, behind Cloudflare Tunnel
(ping.nomadmalta.com -> http://localhost:8787). Python 3 standard library only.

The spot pages send small anonymous notes here (page, sticker, language, action).
Cloudflare adds the visitor's country. No IP address, cookie or device ID is stored.
A QR-sticker visit triggers an instant Telegram message.

Run by systemd (see README.md). Test locally:  python3 collector.py
"""
import json, os, re, sqlite3, sys, threading, time, urllib.parse, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
DB = HERE / "events.db"
PORT = int(os.environ.get("COLLECTOR_PORT", "8787"))
MAX_PER_DAY = 20000          # hard cap so a flood can't fill the SD card
KEEP_DAYS = 180

EVENT_RE = re.compile(r"^[a-z_]{1,32}$")
SAFE_RE = re.compile(r"^[A-Za-z0-9_\-./]{0,64}$")
TEXT_RE = re.compile(r"^[^\x00-\x1f<>\"\\]{0,40}$")   # short labels, any language (e.g. caption angle)


def load_env():
    f = HERE / ".env"
    if f.exists():
        for line in f.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def db():
    con = sqlite3.connect(DB, timeout=10)
    con.execute("""CREATE TABLE IF NOT EXISTS events(
        ts INTEGER, event TEXT, loc TEXT, lang TEXT, sticker TEXT, country TEXT, extra TEXT)""")
    con.execute("CREATE INDEX IF NOT EXISTS ix_ts ON events(ts)")
    return con


def telegram(text):
    token, chat = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat:
        return
    data = urllib.parse.urlencode({"chat_id": chat, "text": text, "disable_web_page_preview": "true"}).encode()
    try:
        urllib.request.urlopen(f"https://api.telegram.org/bot{token}/sendMessage", data=data, timeout=15).read()
    except Exception as e:
        print("telegram failed:", e, file=sys.stderr)


def clean(v, pattern=SAFE_RE, default=""):
    v = str(v or "")[:64]
    return v if pattern.match(v) else default


class Handler(BaseHTTPRequestHandler):
    server_version = "nomad-collector"

    def log_message(self, *args):  # never log visitor addresses
        pass

    def _cors(self):
        origin = self.headers.get("Origin", "")
        if origin in ("https://spots.nomadmalta.com", "https://nomadmalta.com"):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")

    def do_OPTIONS(self):
        self.send_response(204); self._cors()
        self.send_header("Access-Control-Allow-Methods", "POST")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200); self.end_headers(); self.wfile.write(b"ok")
        else:
            self.send_response(404); self.end_headers()

    def do_POST(self):
        if self.path != "/e":
            self.send_response(404); self.end_headers(); return
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > 2048:
            self.send_response(413); self.end_headers(); return
        try:
            body = json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception:
            self.send_response(400); self.end_headers(); return

        event = clean(body.get("e"), EVENT_RE)
        if not event:
            self.send_response(400); self.end_headers(); return
        loc = clean(body.get("loc"))
        lang = body.get("lang") if body.get("lang") in ("en", "zh") else ""
        sticker = clean(body.get("sticker"))
        sticker = "" if sticker == "none" else sticker
        country = clean(self.headers.get("CF-IPCountry"), re.compile(r"^[A-Z]{2}$"))
        extra = {k: clean(body.get(k), TEXT_RE) for k in ("caption", "angle", "format", "slot") if body.get(k)}

        now = int(time.time())
        with self.server.lock:
            con = db()
            today = con.execute("SELECT COUNT(*) FROM events WHERE ts > ?", (now - 86400,)).fetchone()[0]
            if today < MAX_PER_DAY:
                con.execute("INSERT INTO events VALUES (?,?,?,?,?,?,?)",
                            (now, event, loc, lang, sticker, country, json.dumps(extra) if extra else ""))
                con.execute("DELETE FROM events WHERE ts < ?", (now - KEEP_DAYS * 86400,))
                con.commit()
            con.close()

        self.send_response(204); self._cors(); self.end_headers()

        # Instant alert: first page view of a visit that came through a QR sticker
        if event == "board_view" and sticker and body.get("first") is True:
            where = f" · {country}" if country else ""
            lang_txt = {"en": "English", "zh": "Chinese"}.get(lang, "")
            threading.Thread(target=telegram, args=(
                f"🔔 QR scan: sticker {sticker} · {loc or 'spot'}{where}{' · ' + lang_txt if lang_txt else ''}",), daemon=True).start()


if __name__ == "__main__":
    load_env()
    db().close()
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    srv.lock = threading.Lock()
    print(f"collector listening on 127.0.0.1:{PORT}", flush=True)
    srv.serve_forever()
