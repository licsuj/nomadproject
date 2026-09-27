# NomadMalta

Editorial site covering the Malta Nomad Residence Permit. Built with Vite, React, TypeScript, Tailwind CSS, and react-markdown. Articles live as `.md` files in the repo and render at `/guides/[slug]`.

The repo also holds **spots.nomadmalta.com** (the Malta Shot Board QR pages) in `spots/`. That's a separate static site deployed as its own Vercel project. See `spots/README.md`.

Monetisation options for both sites are in `docs/monetization.md`.

## Stack

- **Vite** — build tool and dev server
- **React 18** — UI framework
- **TypeScript** — type safety throughout
- **Tailwind CSS** — utility-first styling
- **@tailwindcss/typography** — prose styling for articles
- **react-markdown + remark-gfm** — markdown rendering with GitHub-flavored extensions (tables, strikethrough)
- **Custom frontmatter parser** (`src/lib/articles.ts`), with no extra dependency
- **react-router-dom v6** — client-side routing

Total production dependencies: 6. No bloat.

## Project structure

```
nomadmalta/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ArticleRenderer.tsx     # Markdown → styled HTML
│   │   ├── SiteFooter.tsx          # Footer (used on every page)
│   │   └── SiteHeader.tsx          # Header (used on every page)
│   ├── content/
│   │   └── articles/
│   │       └── 2026-malta-nrp-guide.md   # First article
│   ├── lib/
│   │   ├── articles.ts             # Loads .md files, exposes helpers
│   │   └── useSeo.ts               # Per-page <title> and meta description
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GuidesIndexPage.tsx
│   │   ├── ArticlePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── styles/
│   │   └── index.css               # Tailwind + design tokens + prose
│   ├── App.tsx                     # Layout and routes
│   ├── main.tsx                    # Entry point
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── scripts/prerender.mjs           # Writes static HTML per page + sitemap.xml + llms.txt
├── src/entry-server.tsx            # Build-time renderer used by the prerender step
├── spots/                          # spots.nomadmalta.com (separate Vercel project)
├── docs/monetization.md
├── vercel.json                     # Clean URLs (/guides/foo serves guides/foo.html)
└── vite.config.ts
```

## How pages reach Google and AI search

`npm run build` does three things:

1. `vite build`: the normal browser bundle.
2. `vite build --ssr src/entry-server.tsx`: a build-time renderer.
3. `node scripts/prerender.mjs`: writes a full static HTML file for every page into `dist/`. Each file has its own title, description, canonical URL, Open Graph tags and JSON-LD structured data. The script also writes `sitemap.xml`, using each guide's `updated` date, and `llms.txt`, a plain list of pages for AI assistants.

Before this change, every URL returned an empty page until JavaScript ran, and most AI crawlers don't run JavaScript. Now the full article text is in the HTML. React then takes over in the browser as before.

**New article:** add the `.md` file and nothing else. The sitemap, llms.txt and the page's HTML are generated on the next deploy. Don't edit a sitemap by hand; `public/sitemap.xml` has been removed.

**New page (route):** add it to `App.tsx` **and** to `routes()` in `src/entry-server.tsx`, or it won't be prerendered.

## Deployment to Vercel (the right way)

The whole point of this setup: you push to GitHub, Vercel deploys, you never touch a terminal.

### First-time setup

1. **Create a new GitHub repo.** Either via github.com/new or by uploading these files to your existing repo (replacing what's there). Recommended: new repo so the Lovable repo stays as a UI reference.

2. **Upload all files.** In the GitHub web UI:
   - Click "Add file" → "Upload files"
   - Drag the entire project folder in
   - Commit

   GitHub preserves folder structure when you upload from a local folder.

3. **Connect Vercel.**
   - Sign in at vercel.com with your GitHub account
   - Click "Add New" → "Project"
   - Select the repo
   - Vercel auto-detects Vite. Don't change any defaults.
   - Click "Deploy"

4. **Wait ~60 seconds.** Vercel runs `npm install`, then `npm run build`, then deploys.

5. **Add your custom domain.**
   - In Vercel project settings → Domains → add `nomadmalta.com`
   - Vercel shows you DNS records to set
   - Go to your domain registrar, set the records
   - SSL is automatic

### Adding new articles (the weekly workflow)

Every article in your 12-week calendar follows the exact same pattern:

1. Open GitHub in your browser
2. Navigate to `src/content/articles/`
3. Click "Add file" → "Create new file"
4. Name it (e.g. `nrp-rejection-reasons.md`)
5. Paste the article markdown with frontmatter
6. Click "Commit changes"
7. Vercel auto-deploys within 30 seconds

That's the entire publishing workflow. No terminal, no npm, no local environment.

### Frontmatter format

Every article needs this YAML block at the top:

```yaml
---
title: "Article title"
subtitle: "Optional italic subtitle"
slug: "url-slug"
description: "SEO description, 1-2 sentences"
published: "2026-05-12"
updated: "2026-05-12"
readingTime: "8 min read"
category: "Permit guide"
order: 2
---
```

- `slug` becomes the URL: `/guides/url-slug`
- `order` controls sort order on the index page (lower = earlier)
- `updated` should be bumped whenever you revise the article (Google rewards this)

## Design system

Color tokens are defined as HSL CSS variables in `src/styles/index.css`. Tailwind config maps them to utility classes:

Same visual system as spots.nomadmalta.com (`spots/assets/board.css`). Colours are defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|---|---|---|
| `salt` | #EEF3F3 | Page background (limestone) |
| `card` | #FFFFFF | Cards |
| `ink` / `ink-soft` / `ink-mute` | #0B1A24 / #2F4552 / #50636E | Headings / body / captions |
| `grotto` | #08395F | Dark panels (article header, featured guide, footer) |
| `sea` | #0079BA | Links and highlighted words in headings (`<em>`) |
| `luzzu` | #F6C21C | Primary buttons only |
| `line` | #D3DEE0 | Rules and borders |

Shared classes live in `src/styles/index.css`: `.display`, `.eyebrow`, `.card`, `.btn-y`, `.btn-o`, `.btn-ink`, `.panel-dark`, `.chip`.

Fonts: Bricolage Grotesque (headings), Instrument Sans (body), JetBrains Mono (labels).

## What this site does NOT do

By design, the project doesn't include:

- A CMS (markdown in git is faster and free)
- A comments system (LinkedIn and Reddit are your distribution)
- Newsletter signup forms (decide separately; can add to footer later)
- Author bio blocks (intentionally — your moat is editorial voice)
- shadcn/ui or any component library (custom components only — fewer dependencies, easier to maintain)
- A server (pages are prerendered to static HTML at build time; there is nothing running at request time)

Add these only when you have evidence they're needed.

## Maintenance discipline

The single most underrated SEO practice: **bump the `updated` field every quarter.** Every 3 months:

1. Re-read each published article
2. Check Residency Malta's FAQ for rule changes
3. Update any stale numbers (income thresholds, fees, ineligible countries)
4. Update the `updated:` date in the frontmatter
5. Commit

Google rewards regularly-updated content over stale content. This single practice compounds over years.

## License

Your code, your IP. No license file because nothing in here is open source. If you ever want to make it open source, MIT is the standard.
