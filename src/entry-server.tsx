/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Renders each route to static HTML so search engines and AI crawlers
 * get the full page without running JavaScript.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { SeoContext, renderHeadTags, type SeoOptions } from '@/lib/useSeo';
import { getAllArticles } from '@/lib/articles';

export function render(url: string) {
  const collector: { current?: SeoOptions } = {};
  const html = renderToString(
    <SeoContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoContext.Provider>
  );
  const seo = collector.current ?? { title: 'NomadMalta' };
  return { html, head: renderHeadTags(seo), seo };
}

/** Every public page, with its last-updated date where the site actually records one. */
export function routes(): { path: string; lastmod?: string; title: string; description?: string }[] {
  const articles = getAllArticles();
  const latest = articles.map((a) => a.updated).sort().at(-1);
  return [
    { path: '/', lastmod: latest, title: 'Home', description: 'The Malta nomad permit, without the brochure copy.' },
    { path: '/guides', lastmod: latest, title: 'All guides', description: 'Every guide on the Malta Nomad Residence Permit.' },
    ...articles.map((a) => ({ path: `/guides/${a.slug}`, lastmod: a.updated, title: a.title, description: a.description })),
    { path: '/malta', title: 'Malta in 12 facts', description: 'Quick orientation for anyone considering Malta as a base.' },
    { path: '/about', title: 'About', description: 'Who writes NomadMalta, how accuracy works, and how the site makes money.' },
  ];
}
