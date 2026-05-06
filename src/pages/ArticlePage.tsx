import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
} from '@/lib/articles';
import ArticleRenderer from '@/components/ArticleRenderer';
import useSeo from '@/lib/useSeo';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo({
    title: article ? `${article.title} — NomadMalta` : 'Article — NomadMalta',
    description: article?.description,
    canonicalPath: article ? `/guides/${article.slug}` : undefined,
    jsonLd: article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.updated,
          dateModified: article.updated,
          author: {
            '@type': 'Organization',
            name: 'NomadMalta',
            url: 'https://nomadmalta.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'NomadMalta',
            url: 'https://nomadmalta.com',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://nomadmalta.com/guides/${article.slug}`,
          },
          articleSection: article.category,
        }
      : undefined,
  });

  if (!article) {
    return <Navigate to="/guides" replace />;
  }

  const related = getRelatedArticles(article.slug, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container max-w-3xl py-4">
          <Link
            to="/guides"
            className="text-sm text-ink-mute hover:text-ink transition-colors"
          >
            ← All guides
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-paper">
        <div className="container max-w-3xl py-16 md:py-24">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-6">
            {article.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1] tracking-tight mb-6">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-ink-soft font-display italic leading-snug">
              {article.subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-mute">
            <span>Updated {formatDate(article.updated)}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container max-w-3xl py-12 md:py-16">
        <ArticleRenderer body={article.body} />

        {/* Disclaimer */}
        <hr className="border-border my-12" />
        <div className="text-sm text-ink-mute italic leading-relaxed space-y-3">
          <p>
            This guide was last updated on {formatDate(article.updated)}. Where
            the regulation changes, this article will be updated. Where the
            rule is genuinely uncertain, this article says so rather than
            pretending otherwise.
          </p>
          <p>
            Nothing here constitutes legal, tax, or immigration advice. For
            your specific case, consult a licensed agent.
          </p>
        </div>
      </div>

      {/* Read next */}
      {related.length > 0 && (
        <section className="border-t border-border bg-paper">
          <div className="container max-w-5xl py-16 md:py-20">
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10 font-medium">
              Read next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/guides/${r.slug}`}
                  className="group block p-6 bg-background border border-border hover:border-ink transition-colors"
                >
                  <div className="text-xs uppercase tracking-widest text-accent font-mono mb-3">
                    {r.category}
                  </div>
                  <h3 className="font-display text-lg text-ink leading-snug mb-2 group-hover:underline font-medium">
                    {r.title}
                  </h3>
                  <p className="text-sm text-ink-mute leading-relaxed">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
