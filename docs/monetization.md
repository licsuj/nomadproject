# Monetisation: nomadmalta.com and spots.nomadmalta.com

These are options only. Nothing on this list is switched on by this update. Everything here comes from what the site already says or from what we discussed for spots.

## nomadmalta.com

### What the site already says it will do

| Path | Where the site says it | What it earns (the site's own figures) |
|---|---|---|
| Referral fees from licensed Maltese immigration agents | About page, "How this site makes money" | €100–€500 per client who engages an agent |
| Referral fees from long-let letting agencies | About page | €100–€600 per let (half-month commission split) |
| Affiliate links for health insurance (SafetyWing, Genki, Cigna) and banking (Wise, Revolut Business) | Home page directory cards tagged "Affiliate" | Not stated |
| Featured directory slots | Home page: "featured slots open from week 4" | Not stated |
| Newsletter list (the cheat sheet on beehiiv) | Home page | Nothing directly. It is the list you would send referrals to. |

### Suggested order

1. **Agent referrals first.** This earns the most per conversion, and the traffic is already there: the "How to Choose a Maltese Immigration Agent" guide gives exactly the right reader. Close one or two referral agreements, then turn the "View the three firms" card into a real page.
2. **Letting-agency referrals second.** Every applicant needs a 12-month lease, and the "Apartments & Landlords" card already promises four agencies.
3. **Insurance affiliate third.** Every applicant needs a policy with at least €100K of cover. It pays less per sale, but needs no negotiation.

### Conflicts to settle first (the site currently contradicts itself)

- **Featured slots.** The About page says "No pay-to-be-featured directories", but the home page says "featured slots open from week 4". Pick one.
- **Non-Maltese affiliates.** The About page says the site only has affiliate relationships with agents and letting agencies, and "we don't take referral fees from providers based outside Malta". The home page tags SafetyWing, Genki, Cigna, Wise and Revolut as "Affiliate", and none of them are Maltese providers. Either change the About page or drop those tags.
- **Nothing to click yet.** All six directory cards say "coming soon". Until at least one of them is a real page with a real link, the site can't earn anything.

### When to stop

After this update goes live, check Google Search Console after 90 days. If the guide pages are still under about 1,000 impressions a month and no referral agreement is signed, the SEO-led plan isn't working. Stop adding guides and decide whether to keep the site.

## spots.nomadmalta.com

Visitors never pay, and there are no banner ads. In order:

1. **Prove scans first.** One QR code, 4 weeks.
2. **Boat-trip affiliate link.** Set `boat.url` in `data.js`. GetYourGuide pays about 8% with a 31-day cookie. Expect tens of euros a month, not hundreds.
3. **One local sponsor per location.** Set `localPick` to one café, restaurant, boat operator or photographer near the viewpoint, for a flat monthly fee. Pitch it only once you have scan numbers.
4. **Licence the page format to tour operators and hotels,** especially operators running Chinese groups. This has the most money in it.

**Dropped:** banner ads, eSIM affiliate links, collecting emails for affiliate tracking, and linking to ToolPilot.

**When to stop:** after 4 weeks or 200 scans. Stop if there are fewer than about 100 scans, or if fewer than 1 in 5 visitors tap a Copy button.

## Between the two sites

Spots pages link to NomadMalta through a small "Staying longer than a holiday?" card near the bottom. That link is tagged `utm_source=spots`. Most tourists won't be permit prospects, so treat this as a cheap test rather than a traffic plan.

**When to stop:** if the card gets fewer than 1 click per 100 scans after the first 500 scans, remove it and give the space back to the recipe.
