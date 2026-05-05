import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '@/lib/useSeo';

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
    context: 'Culturally Catholic, legally secular.',
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
    symbol: '🚗',
    headline: 'Drive on the left',
    context: 'A British colonial legacy.',
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
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="border-b border-border">
        <div className="container max-w-5xl py-20 md:py-28">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-8">
            About Malta · Quick orientation
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1] tracking-tight max-w-3xl mb-6">
            Malta, in twelve facts.
          </h1>
          <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl">
            The minimum context anyone considering Malta as a 1&ndash;4 year base should
            know. Verified, current, deliberately short.
          </p>
        </div>
      </section>

      {/* ============== FACTS GRID ============== */}
      <section>
        <div className="container max-w-6xl py-20 md:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {facts.map((fact, index) => (
              <FactCard key={index} fact={fact} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== POSTSCRIPT ============== */}
      <section className="border-t border-border bg-paper">
        <div className="container max-w-3xl py-20 md:py-24 text-center">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-6">
            Next
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-medium tracking-tight mb-6">
            The facts above are the easy part.
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed mb-10 max-w-2xl mx-auto">
            The harder parts are the visa, the cost, the tax rules, and whether
            it actually fits your situation. That&rsquo;s what the rest of the site
            is for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/guides/2026-malta-nrp-guide"
              className="px-6 py-3 bg-ink text-background hover:bg-ink-soft transition-colors text-sm font-medium"
            >
              The 2026 NRP guide
            </Link>
            <Link
              to="/guides"
              className="px-6 py-3 border border-ink text-ink hover:bg-background transition-colors text-sm font-medium"
            >
              All guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============== FACT CARD ============== */
function FactCard({ fact, index }: { fact: Fact; index: number }) {
  const number = String(index + 1).padStart(2, '0');
  return (
    <div className="bg-background p-8 md:p-10 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div className="text-5xl md:text-6xl leading-none" aria-hidden="true">
          {fact.symbol}
        </div>
        <div className="font-mono text-xs text-ink-mute tracking-widest pt-2">
          № {number}
        </div>
      </div>
      <div className="font-display text-xl md:text-2xl text-ink font-medium leading-tight mb-3">
        {fact.headline}
      </div>
      <div className="text-sm text-ink-soft leading-relaxed">
        {fact.context}
      </div>
    </div>
  );
}
