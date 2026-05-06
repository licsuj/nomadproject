import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, formatDate } from '@/lib/articles';
import useSeo from '@/lib/useSeo';

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
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'NomadMalta guides',
      url: 'https://nomadmalta.com/guides',
      description:
        'All guides on the Malta Nomad Residence Permit.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'NomadMalta',
        url: 'https://nomadmalta.com',
      },
    },
  });

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-paper">
        <div className="container max-w-3xl py-16 md:py-24">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-6">
            Guides
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1] tracking-tight mb-6">
            Everything we've published on the Malta NRP
          </h1>
          <p className="text-xl text-ink-soft font-display italic leading-snug">
            Working guides on cost, process, eligibility, and the edge cases
            nobody else publishes.
          </p>
        </div>
      </header>

      {/* Article list */}
      <div className="container max-w-3xl py-12 md:py-16">
        <div className="space-y-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/guides/${article.slug}`}
              className="group block py-8 border-b border-border last:border-b-0"
            >
              <div className="text-xs uppercase tracking-widest text-accent font-mono mb-3">
                {article.category}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-3 group-hover:underline font-medium">
                {article.title}
              </h2>
              {article.subtitle && (
                <p className="text-lg text-ink-soft font-display italic mb-4">
                  {article.subtitle}
                </p>
              )}
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-mute">
                <span>Updated {formatDate(article.updated)}</span>
                <span>·</span>
                <span>{article.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming-soon footer */}
        <div className="mt-16 p-6 border border-dashed border-border bg-paper">
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
