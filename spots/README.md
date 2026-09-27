# Malta Shot Board

Static pages only. There is no backend, no API, no scraping and no build step. It is hosted on Vercel as its own project (see Domain and hosting below).

```
assets/board.css         shared styles (all locations)
assets/board.js          shared renderer (all locations)
assets/spots.js          list of all spots (for "Moved on?" and "Other spots")
blue-grotto/data.js      ← the only file you edit for this spot
blue-grotto/index.html   ← the QR points here. Picks English or Chinese from the phone's language, with a switch button.
blue-grotto/zh/index.html  always Chinese. Share this link in Chinese channels (WeChat, 小红书 bio).
```

**New location:** copy the `blue-grotto` folder, rename it, rewrite `data.js`, and add the spot to `assets/spots.js` with `live: true`. The shared files stay as they are.

**Domain and hosting (Vercel):** this folder is its own site, separate from nomadmalta.com. It lives in the same GitHub repo.

1. In Vercel, click Add New → Project and pick the same repo again.
2. Set **Root Directory** to `spots`. Set Framework Preset to **Other**, and leave the build command and output directory empty.
3. Deploy, then go to Settings → Domains and add `spots.nomadmalta.com`. Vercel shows the DNS record to add at your registrar, usually a CNAME for `spots`.

**Sticker links:** `spots/vercel.json` holds short redirects. `spots.nomadmalta.com/q/bg1` goes to the Blue Grotto page and tags the visit as sticker `bg1`. Add one line per sticker, so you can change where a sticker points without reprinting it. `/` also redirects to Blue Grotto while it is the only live spot.

## Curator preview

Add `?preview` to any page URL, for example `spots.nomadmalta.com/blue-grotto/?preview`. You'll then see:
- a red bar with how many posts are verified
- example monthly numbers
- spots that aren't live yet
- dashed outlines and "Link pending" on unverified posts

Visitors never see any of this. Until at least one post is verified, visitors see the posts labelled as "Illustration", and the intro describes them as the kinds of posts people make here, not real posts.

## Captions

There are 5 captions per language, each written from a different angle. Each one copies with its own hashtags:
- **Core tags:** `coreTags` plus your tracking tag. These never change.
- **Extra tags:** 2 per caption, matching its angle.

The `copy_caption` event records which caption (1–5) was copied. After a month, move the most-copied caption to position 1.

## This spot this month

Once a month, fill in `month` in `data.js` from the posts you reviewed:
- how many posts you checked
- how many of each format
- the most common opening
- the most common caption angle

A public view count is allowed only if you read it yourself, with the date. In curator preview (see below) the card shows labelled example numbers. Visitors only see the card once real counts are filled in.

## Tourist moves to another spot

- **Stale tab:** if a tab sits in the background for more than 90 minutes and then comes back, the page asks "Moved on?" and lists the other live spots. Change this with `STALE_MIN` in `board.js`.
- **Find my spot:** a button that asks for location once, on tap. The distance is worked out on the phone, nothing is sent or stored, and it opens the spot's page if one is within 1.5 km. It only appears once every live spot has `coords` in `spots.js`.
- **No background location tracking.** A web page can't do it, and it would need GDPR consent anyway.
- **Preview the prompt:** add `#moved` to the page URL.

## How the two languages differ

| | English | Chinese |
|---|---|---|
| Default format | Reel / TikTok | 图文 carousel for 小红书 |
| Captions | 5 angles: useful, short, moody, question, relatable | 5 angles: 小红书攻略, 抖音一句话, 氛围感, 提问, 中英双语 |
| Hashtags | Instagram/TikTok set + #BlueGrottoShot | 小红书/抖音 set + #蓝洞拍同款 |
| Map button | Google Maps | 高德 when `coords` is set, plus Apple Maps |
| Fonts | Google Fonts | System fonts only. Google is usually blocked on Chinese roaming. |
| Extra note | — | Explains that Instagram and TikTok usually don't open on a Chinese roaming SIM |

## Before printing the QR

1. Fill 3–5 `posts` with verified public posts filmed **from this viewpoint** (the arch from above, Filfla on the horizon). Set `verified: true`, `url` and `creator`. Rewrite `hook`/`why` in both languages based on the real post.
2. Leave `thumb` empty unless the creator has given written permission.
3. Fix each pattern's `seenIn`, and delete any pattern that appears in fewer than 2 posts.
4. Register your accounts and fill `handles`. Keep the `trackTag` tags. Search both weekly by hand.
5. Set `coords` (from Google Maps: long-press the pin) to enable the 高德 link.
6. Set `CONTACT` at the top of `assets/board.js`.
7. Set `draft: false` in `data.js`.
8. Delete the `<meta name="robots" content="noindex">` line in both `blue-grotto/index.html` and `blue-grotto/zh/index.html`, so search engines can list the page.

## Email (optional, English page only)

`signup.action` = your email provider's form URL (Buttondown, MailerLite and similar). An empty value hides the form. The form has a required consent checkbox; turn on double opt-in at the provider.

Affiliate commissions don't need emails, because they're tracked by the link click. Add this only after the copy-rate test passes, and drop it if fewer than 2% of visitors sign up after 500 scans.

## Link to NomadMalta

Every spot page has a small "Staying longer than a holiday?" card that links to nomadmalta.com. The link is tagged `utm_source=spots`, so you can see in analytics how much traffic spots sends. Change it with `NOMAD_URL` at the top of `assets/board.js`. Clicks are tracked as the `nomadmalta` event.

## Money slots (both hidden or passive by default)

- `boat.url`: boat-trip affiliate link. The link and its disclosure only appear once a URL is set.
- `localPick`: one paid local listing, labelled "Sponsored". `null` hides it. No banner ads.

## Measuring

- Give each sticker its own QR URL: `/blue-grotto/?q=bg-railing-1`.
- Uncomment the Plausible lines in both `index.html` files (cookie-free). The page already sends these events with `lang`, `sticker` and `loc`: `board_view`, `copy_caption` (with caption number), `copy_hashtags`, `copy_shots`, `switch_format`, `switch_lang`, `open_post`, `open_map`, `boat`, `local_pick`, `moved_prompt`, `moved_stay`, `go_spot`, `find_spot`. Add them as goals in Plausible.
- **Kill test:** after 4 weeks or 200 scans, stop if scans are under about 100, or if fewer than 1 in 5 visitors tap any Copy button.
