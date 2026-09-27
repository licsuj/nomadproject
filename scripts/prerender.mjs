/**
 * Build step 3 of 3 (after the client and server builds).
 * Writes one static HTML file per page into dist/, plus sitemap.xml and llms.txt.
 * Vercel serves dist/guides/foo.html at /guides/foo (cleanUrls in vercel.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://nomadmalta.com';
const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo--> block or the empty root div.');
}

function page(url) {
  const { html, head } = render(url);
  return template.replace(SEO_BLOCK, head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  prerendered', path.relative(dist, file));
}

const list = routes();
for (const r of list) {
  const file = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${r.path.slice(1)}.html`);
  write(file, page(r.path));
}
write(path.join(dist, '404.html'), page('/__not-found__'));

// sitemap.xml — lastmod only where the site records a real date
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list
  .map((r) => `  <url>\n    <loc>${ORIGIN}${r.path === '/' ? '/' : r.path}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`;
write(path.join(dist, 'sitemap.xml'), sitemap);

// llms.txt — a plain-text map of the site for AI assistants (emerging convention, see llmstxt.org)
const guides = list.filter((r) => r.path.startsWith('/guides/'));
const others = list.filter((r) => !r.path.startsWith('/guides/') && r.path !== '/');
const llms = `# NomadMalta

> Independent editorial guides to the Malta Nomad Residence Permit (NRP), written from Malta. Cost, process, eligibility, renewal and tax. Information only; not legal, tax or immigration advice.

## Guides
${guides.map((r) => `- [${r.title}](${ORIGIN}${r.path}): ${r.description}`).join('\n')}

## Site
${others.map((r) => `- [${r.title}](${ORIGIN}${r.path}): ${r.description}`).join('\n')}
`;
write(path.join(dist, 'llms.txt'), llms);

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
