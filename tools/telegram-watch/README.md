# Telegram alerts (Raspberry Pi)

Sends visitor alerts for spots.nomadmalta.com to your Telegram. Reads counts from Umami; never sees visitor IPs.

| Alert | When | Command |
|---|---|---|
| QR scan | a visitor arrives through a sticker link (`?q=bg1`) | `watch.py scans` every 2 min |
| 30-minute summary | only if there were visitors | `watch.py summary` every 30 min |
| Daily summary | every evening, even if zero | `watch.py daily` at 21:00 |

## Setup on the Pi

```bash
mkdir -p ~/nomad-alerts && cd ~/nomad-alerts
# copy watch.py and .env.example from this folder into ~/nomad-alerts, then:
cp .env.example .env && chmod 600 .env
nano .env          # paste TELEGRAM_BOT_TOKEN and UMAMI_API_KEY
python3 watch.py chatid    # prints your TELEGRAM_CHAT_ID (message your bot first) → paste it into .env
python3 watch.py test      # you should get "✅ NomadMalta alerts are connected."
python3 watch.py daily     # first real report (shows zeros if nobody visited today)
```

Then `crontab -e` and add:

```
*/2 * * * *  cd $HOME/nomad-alerts && /usr/bin/python3 watch.py scans   >> alerts.log 2>&1
*/30 * * * * cd $HOME/nomad-alerts && /usr/bin/python3 watch.py summary >> alerts.log 2>&1
0 21 * * *   cd $HOME/nomad-alerts && /usr/bin/python3 watch.py daily   >> alerts.log 2>&1
```

Check the Pi's time zone is Malta (`timedatectl`; fix with `sudo timedatectl set-timezone Europe/Malta`) so the daily report arrives at 21:00 local.

## If something fails

- **"Umami refused the API key"**: the key is wrong, or API access isn't included in your Umami plan.
- **No QR scan alerts, but visits show in Umami**: open Umami → the site → Query parameters. Scans should appear as `q=bg1`. If they don't, tell Claude.
- **Too noisy?** Delete the `scans` line from crontab. You'll still get the 30-minute and daily summaries.
