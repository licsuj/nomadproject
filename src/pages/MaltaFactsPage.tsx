import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo, { SITE_ORIGIN } from '@/lib/useSeo';
import { breadcrumbs, withOrg } from '@/lib/schema';

interface Fact {
  symbol: string;
  headline: string;
  context: string;
}

const facts: Fact[] = [
  {
    symbol: '☀️',
    headline: '~300 days of sunshine',
    context: 'Among Europe\u2019s sunniest countries.',
  },
  {
    symbol: '🇪🇺',
    headline: 'EU + Schengen + Eurozone',
    context: 'Full member of all three.',
  },
  {
    symbol: '🗣️',
    headline: 'English is official',
    context: 'Equal status with Maltese.',
  },
  {
    symbol: '🏳️‍🌈',
    headline: '#1 in Europe for LGBTQ+ rights',
    context: 'ILGA Rainbow Map, 10 years running.',
  },
  {
    symbol: '🚌',
    headline: 'Free public transport',
    context: 'For residents with Tallinja Card since 2022.',
  },
  {
    symbol: '🏖️',
    headline: '27 days annual leave',
    context: 'Statutory minimum for full-time workers in 2026.',
  },
  {
    symbol: '📅',
    headline: '14 public holidays',
    context: 'Among the highest counts in Europe.',
  },
  {
    symbol: '⛪',
    headline: '~83% Roman Catholic',
    context: 'Constitutionally Catholic, day-to-day relaxed.',
  },
  {
    symbol: '🏛️',
    headline: '7,000 years inhabited',
    context: 'Older than the Egyptian pyramids.',
  },
  {
    symbol: '🌍',
    headline: '3 UNESCO World Heritage Sites',
    context: 'Valletta, the Megalithic Temples, and the Hypogeum.',
  },
  {
    symbol: '🎰',
    headline: 'Global iGaming capital',
    context: 'Over 300 licensed gaming companies. ~12% of national GDP.',
  },
  {
    symbol: '💶',
    headline: 'Euro since 2008',
    context: 'Joined the Eurozone January 2008.',
  },
];

export default function MaltaFactsPage() {
  useSeo({
    title: 'Malta in 12 facts — NomadMalta',
    description:
      'Twelve verified facts about Malta — sunshine, holidays, LGBTQ+ rights, language, currency, and more. The quick orientation for anyone considering Malta as a base.',
    canonicalPath: '/malta',
    jsonLd: withOrg(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Malta in 12 facts',
        url: `${SITE_ORIGIN}/malta`,
        description:
          'Twelve verified facts about Malta for anyone considering it as a 1–4 year base.',
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@type': 'Country', name: 'Malta' },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: facts.map((f, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${f.headline}. ${f.context}`,
          })),
        },
      },
      breadcrumbs([
        ['Home', '/'],
        ['Malta in 12 facts', '/malta'],
      ])
    ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="container max-w-5xl pt-12 pb-8 md:pt-20">
        <div className="eyebrow live-dot mb-4">About Malta · Quick orientation</div>
        <h1 className="display text-[38px] md:text-6xl leading-[1.02] max-w-3xl mb-5">
          Malta, in <em>twelve facts.</em>
        </h1>
        <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl">
          The minimum context anyone considering Malta as a 1&ndash;4 year base should
          know. Verified, current, deliberately short.
        </p>
      </header>

      <section className="container max-w-6xl pb-16 md:pb-24">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.headline} className="card flex flex-col gap-2 p-6">
              <span className="text-3xl leading-none" aria-hidden="true">{fact.symbol}</span>
              <h2 className="font-display text-xl md:text-[22px] font-extrabold leading-tight tracking-tight text-ink">
                {fact.headline}
              </h2>
              <p className="text-[15px] text-ink-mute leading-relaxed">{fact.context}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel-dark">
        <div className="container max-w-3xl relative py-16 md:py-20">
          <div className="eyebrow-dark mb-4">Next</div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            The facts above are the easy part.
          </h2>
          <p className="text-lg text-on-dark-mute leading-relaxed mb-8 max-w-2xl">
            The harder parts are the visa, the cost, the tax rules, and whether
            it actually fits your situation. That&rsquo;s what the rest of the site
            is for.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/guides/2026-malta-nrp-guide" className="btn-y">The 2026 NRP guide</Link>
            <Link to="/guides" className="btn border-[1.5px] border-on-dark text-on-dark hover:bg-white/10">All guides</Link>
          </div>
        </div>
      </section>
    </>
  );
}
