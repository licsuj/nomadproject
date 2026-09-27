# Telegram alerts (Raspberry Pi)

The spot pages send small anonymous notes (which page, which sticker, the language, and the action) to your Pi through Cloudflare Tunnel at `ping.nomadmalta.com`. Cloudflare adds the visitor's country. **No IP address, cookie or device ID is stored.** The Pi keeps counts in `events.db` for 180 days and sends Telegram messages.

| Message | When | Sent by |
|---|---|---|
| 🔔 QR scan | Within seconds of someone arriving through a sticker link (once per visit, not on reload) | `collector.py` (always running) |
| 30-minute summary | Every 30 min, **only if** there were page views | `watch.py summary` (cron) |
| Daily summary | 21:00 every day, even if zero | `watch.py daily` (cron) |

If the Pi is off, notes are lost; Umami still records every visit. Visits with `?preview` in the address are never sent.

## Files

- `collector.py`: receives notes, stores counts, sends the instant QR alert
- `watch.py`: 30-minute and daily summaries; also `test` and `chatid`
- `nomad-collector.service`: keeps the collector running (systemd)
- `config.yml.example`: Cloudflare Tunnel settings
- `.env.example`: copy to `.env` and add your bot token and chat ID (never commit `.env`)

## Useful commands

- Collector status: `systemctl status nomad-collector`
- Tunnel status: `systemctl status cloudflared`
- Health check (from any browser): `https://ping.nomadmalta.com/health` should say `ok`
- Update the code: `cd ~/nomadproject && git pull && sudo systemctl restart nomad-collector`
- Turn off sending from the pages: set `PING_URL = ""` in `spots/assets/board.js`

Cron lines:
```
*/30 * * * * cd $HOME/nomadproject/tools/telegram-watch && /usr/bin/python3 watch.py summary >> alerts.log 2>&1
0 21 * * *   cd $HOME/nomadproject/tools/telegram-watch && /usr/bin/python3 watch.py daily   >> alerts.log 2>&1
```
