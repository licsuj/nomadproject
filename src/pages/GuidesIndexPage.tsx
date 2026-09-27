import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, formatDate } from '@/lib/articles';
import useSeo, { SITE_ORIGIN } from '@/lib/useSeo';
import { breadcrumbs, withOrg } from '@/lib/schema';

export default function GuidesIndexPage() {
  const articles = getAllArticles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: 'Guides — NomadMalta',
    description:
      'All guides on the Malta Nomad Residence Permit: cost, process, eligibility, renewal, and the edge cases nobody else publishes.',
    canonicalPath: '/guides',
    jsonLd: withOrg(
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'NomadMalta guides',
        url: `${SITE_ORIGIN}/guides`,
        description: 'All guides on the Malta Nomad Residence Permit.',
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: articles.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_ORIGIN}/guides/${a.slug}`,
            name: a.title,
          })),
        },
      },
      breadcrumbs([
        ['Home', '/'],
        ['Guides', '/guides'],
      ])
    ),
  });

  return (
    <>
      <header className="container max-w-3xl pt-12 pb-8 md:pt-20">
        <div className="eyebrow live-dot mb-4">Guides · {articles.length} published</div>
        <h1 className="display text-[36px] md:text-6xl leading-[1.02] mb-5">
          Everything we've published on the <em>Malta NRP</em>
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          Working guides on cost, process, eligibility, and the edge cases
          nobody else publishes.
        </p>
      </header>

      <div className="container max-w-3xl pb-16 md:pb-24">
        <ul className="grid gap-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                to={`/guides/${article.slug}`}
                className="card group block p-5 md:p-6 no-underline transition-shadow hover:shadow-[0_12px_28px_-18px_rgba(8,57,95,.6)]"
              >
                <div className="eyebrow mb-2 text-sea">{article.category}</div>
                <h2 className="font-display text-2xl md:text-[28px] font-extrabold leading-tight tracking-tight text-ink mb-2 group-hover:text-sea">
                  {article.title}
                </h2>
                {article.subtitle && <p className="text-base font-semibold text-ink-soft mb-2">{article.subtitle}</p>}
                <p className="text-[15px] text-ink-mute leading-relaxed mb-4">{article.description}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-mute">
                  <span>
                    Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                  </span>
                  <span>·</span>
                  <span>{article.readingTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-card border border-dashed border-line p-5">
          <p className="text-sm text-ink-mute leading-relaxed">
            <strong className="text-ink">More guides coming.</strong> The
            content calendar covers rejection patterns, agent selection,
            renewal-year details, the 10% tax in practice, family edge cases,
            banking reality, persona-specific guides, and the post-year-4
            question. New guide every week.
          </p>
        </div>
      </div>
    </>
  );
}
