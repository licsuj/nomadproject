import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, getRelatedArticles, getHeadings, formatDate } from '@/lib/articles';
import ArticleRenderer, { slugify } from '@/components/ArticleRenderer';
import NotFoundPage from '@/pages/NotFoundPage';
import useSeo from '@/lib/useSeo';
import { articleSchema, breadcrumbs, withOrg } from '@/lib/schema';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo(
    article
      ? {
          title: `${article.title} — NomadMalta`,
          description: article.description,
          canonicalPath: `/guides/${article.slug}`,
          ogType: 'article',
          jsonLd: withOrg(
            articleSchema(article),
            breadcrumbs([
              ['Home', '/'],
              ['Guides', '/guides'],
              [article.title, `/guides/${article.slug}`],
            ])
          ),
        }
      : { title: 'Not found — NomadMalta', noindex: true }
  );

  if (!article) return <NotFoundPage />;

  const related = getRelatedArticles(article.slug, 3);
  const headings = getHeadings(article.body);

  return (
    <>
      {/* Header */}
      <header className="panel-dark">
        <div className="container max-w-3xl relative py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-on-dark-mute">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-white no-underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/guides" className="hover:text-white no-underline">Guides</Link></li>
            </ol>
          </nav>
          <div className="eyebrow-dark mb-4">{article.category}</div>
          <h1 className="font-display text-[34px] md:text-5xl lg:text-[56px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white mb-5">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-lg md:text-xl text-on-dark leading-snug">{article.subtitle}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-on-dark-mute">
            <span>
              Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
            </span>
            {article.published !== article.updated && (
              <span>
                · First published <time dateTime={article.published}>{formatDate(article.published)}</time>
              </span>
            )}
            <span>· {article.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="container max-w-3xl py-10 md:py-14">
        {/* On this page */}
        {headings.length > 2 && (
          <nav aria-label="On this page" className="card mb-10 p-5">
            <div className="eyebrow mb-3">On this page</div>
            <ol className="grid gap-1.5 text-[15px]">
              {headings.map((h) => (
                <li key={h}>
                  <a href={`#${slugify(h)}`} className="font-semibold text-sea no-underline hover:underline">
                    {h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <ArticleRenderer body={article.body} />

        {/* Disclaimer */}
        <div className="card mt-14 space-y-3 p-5 text-sm leading-relaxed text-ink-mute">
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
        <section className="border-t border-line">
          <div className="container max-w-5xl py-14 md:py-16">
            <h2 className="display text-2xl md:text-3xl mb-8">Read next</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/guides/${r.slug}`}
                  className="card group block p-5 no-underline transition-shadow hover:shadow-[0_12px_28px_-18px_rgba(8,57,95,.6)]"
                >
                  <div className="eyebrow mb-2 text-sea">{r.category}</div>
                  <h3 className="font-display text-lg font-bold leading-snug text-ink mb-2 group-hover:text-sea">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-mute">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
