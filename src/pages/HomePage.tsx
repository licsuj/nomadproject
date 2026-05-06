import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, formatDate } from '@/lib/articles';
import useSeo from '@/lib/useSeo';

export default function HomePage() {
  useSeo({
    title: 'NomadMalta — The Malta nomad permit, without the brochure copy',
    description:
      'Working guides on the Malta Nomad Residence Permit. Cost, process, eligibility, and the edge cases nobody else publishes.',
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NomadMalta',
      url: 'https://nomadmalta.com',
      description:
        'Working guides on the Malta Nomad Residence Permit, written from Malta.',
      publisher: {
        '@type': 'Organization',
        name: 'NomadMalta',
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = getAllArticles();
  const featured = articles[0];

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="border-b border-border">
        <div className="container max-w-5xl py-20 md:py-32">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-8">
            Independent · Written from Malta · Updated quarterly
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-ink leading-[1.05] tracking-tight max-w-4xl mb-8">
            The Malta nomad permit,
            <br />
            <span className="italic text-ink-soft">
              without the brochure copy.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-ink-soft leading-relaxed max-w-3xl">
            Real costs, eligibility traps, the 10% tax in practice, and who
            shouldn't bother. Editorial guides for non-EU professionals
            considering Malta as a 1–4 year base.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            <Stat value="€42K" label="Minimum income / year" />
            <Stat value="10%" label="Flat tax, year 2+" />
            <Stat value="4 years" label="Maximum stay" />
            <Stat value="1,031" label="2024 applications" />
          </div>
        </div>
      </section>

      {/* ============== WHAT THIS SITE DOES ============== */}
      <section className="border-b border-border bg-paper">
        <div className="container max-w-5xl py-20">
          <SectionHead num="01" label="Method" subhead="Four jobs, in the order most readers use them.">
            <span className="italic">What this site actually does.</span>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Job heading="Decide" body="Help you work out whether the Malta NRP fits your situation, before you spend money." />
            <Job heading="Compare" body="Side-by-side with Portugal D8, Spain DNV, Greece, Italy, Slovenia. Rent and tax, not just headline numbers." />
            <Job heading="Find" body="Vetted licensed agents, property letting agencies, banks, insurers, accountants — across the four-year journey." />
            <Job heading="Stay" body="Renewal years, the 10% tax in practice, family edge cases, and what comes after year four." />
          </div>
        </div>
      </section>

      {/* ============== ELIGIBILITY ============== */}
      <section className="border-b border-border">
        <div className="container max-w-5xl py-20">
          <SectionHead num="02" label="Eligibility" subhead="You don't qualify if you miss one. There's no flexibility on the income floor or the foreign-employer rule.">
            You qualify if you tick all four.
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <EligibilityCard n="01" title="Non-EU passport" detail="Non-EU, non-EEA, non-Swiss national. Some countries currently ineligible (Russia, Belarus, Iran, others)." />
            <EligibilityCard n="02" title="€42,000+ from foreign work" detail="Gross annual income from genuinely foreign employment, freelance clients, or your own non-Maltese company." />
            <EligibilityCard n="03" title="€100K health insurance" detail="Annual prepaid policy meeting Malta's minimum coverage table (in force since August 2024). Travel insurance not accepted. UK nationals exempt — they have reciprocal access to Maltese healthcare." />
            <EligibilityCard n="04" title="12-month accommodation" detail="Signed and registered lease (or property purchase) in Malta for the validity period of the permit." />
          </div>
          <p className="mt-10 text-base text-ink-mute italic max-w-3xl">
            Missing one?{' '}
            <Link to={`/guides/${featured?.slug ?? '2026-malta-nrp-guide'}`} className="text-sea hover:underline font-medium not-italic">
              Read the full guide
            </Link>{' '}
            for the realistic upfront cost (~€19,000 not €300) and why a small but real percentage of applications get rejected.
          </p>
        </div>
      </section>

      {/* ============== COMPARE: 5 COUNTRIES ============== */}
      <section className="border-b border-border bg-paper">
        <div className="container max-w-6xl py-20">
          <SectionHead num="03" label="Compare · Five countries" subhead="The right answer depends on income, family size, and how much rent you can absorb. Numbers current as of Q2 2026.">
            Malta is one of <span className="italic">five</span> serious Mediterranean options.
          </SectionHead>

          {/* Table */}
          <div className="mt-12 overflow-x-auto bg-background border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr>
                  <th className="bg-ink-soft text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium"></th>
                  <th className="bg-terracotta text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium">Malta</th>
                  <th className="bg-ink text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium">Cyprus</th>
                  <th className="bg-ink text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium">Portugal</th>
                  <th className="bg-ink text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium">Greece</th>
                  <th className="bg-ink text-background py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium">Slovenia</th>
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Min. income" malta="€42,000/yr" cells={['€3,500/mo', '4× minimum wage', '€3,500/mo', '~€2,300/mo']} />
                <CompareRow label="Tax in year 1" malta="0%" cells={['Resident rates', 'NHR closed', '50% reduction', 'Resident rates']} />
                <CompareRow label="Tax thereafter" malta="10% flat" cells={['Up to 35%', 'Standard scale', 'Up to 44%', 'Up to 50%']} />
                <CompareRow label="Permit length" malta="1 yr × 4" cells={['1 yr × 2', '2 yrs × 1', '2 yrs × 1', '1 yr']} />
                <CompareRow label="English fluency" malta="Official language" cells={['Widespread', 'Widespread', 'Patchy', 'Strong (younger)']} />
                <CompareRow label="Sun (days/yr)" malta="~300" cells={['~320', '~280', '~280', '~200']} />
                <CompareRow label="Cost-of-living" malta="High" cells={['Mid', 'Mid-rising', 'Low', 'Mid']} last />
              </tbody>
            </table>
          </div>

          {/* Takeaways */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Takeaway label="Pick Malta if" body={<>You earn over €60K and want the <strong className="not-italic font-semibold text-ink">10% flat tax + English by default</strong>. Rent is the trade-off.</>} />
            <Takeaway label="Pick Portugal if" body={<>You're optimising for <strong className="not-italic font-semibold text-ink">lifestyle and lower rent</strong>, not tax. NHR is closed.</>} />
            <Takeaway label="Pick Slovenia if" body={<>You want <strong className="not-italic font-semibold text-ink">EU access at the lowest income threshold</strong> and don't care about beaches.</>} />
          </div>
        </div>
      </section>

      {/* ============== MALTA TEASER STRIP ============== */}
      <section className="border-b border-border bg-paper">
        <div className="container max-w-5xl py-10">
          <Link
            to="/malta"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
          >
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Aside
              </span>
              <span className="text-base md:text-lg text-ink-soft">
                First time looking at Malta?{' '}
                <span className="text-ink font-medium group-hover:underline">
                  Twelve facts worth knowing →
                </span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============== NEIGHBOURHOODS ============== */}
      <section className="border-b border-border">
        <div className="container max-w-6xl py-20">
          <SectionHead num="04" label="Neighbourhoods" subhead="Where nomads actually live. Walking distance from coworking, English by default, and a long-let market that takes foreign tenants seriously.">
            Four places to base, <span className="italic">honestly compared.</span>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Hood n="i." name="Sliema" tag="Where most nomads end up" stats={[['1-bed rent', '€1,100–1,500'], ['Coworking spaces', '5+'], ['Trade-off', 'Cost']]} />
            <Hood n="ii." name="Gzira" tag="Cheaper neighbour, same walk to coworking" stats={[['1-bed rent', '€750–1,100'], ['Coworking spaces', '3'], ['Trade-off', 'Less polished']]} />
            <Hood n="iii." name="Valletta" tag="Historic centre, limited stock" stats={[['1-bed rent', '€800–1,200'], ['Coworking spaces', '1'], ['Trade-off', 'Tourist density']]} />
            <Hood n="iv." name="Gozo" tag="Slower pace, roughly half the rent" stats={[['1-bed rent', '€500–750'], ['Coworking spaces', '1'], ['Trade-off', 'Ferry to mainland']]} />
          </div>
        </div>
      </section>

      {/* ============== ARTICLES / GUIDES ============== */}
      <section className="border-b border-border bg-paper">
        <div className="container max-w-5xl py-20">
          <SectionHead num="05" label="Guides" subhead="Working guides published weekly. Each one fills a gap that immigration firms don't cover — by content choice or commercial conflict.">
            Where to start.
          </SectionHead>

          {featured && (
            <Link
              to={`/guides/${featured.slug}`}
              className="group block mt-12 p-8 md:p-10 bg-background border border-border hover:border-ink transition-colors"
            >
              <div className="text-xs uppercase tracking-widest text-accent font-mono mb-4">
                {featured.category} · Most read
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-ink font-medium leading-tight mb-3 group-hover:underline">
                {featured.title}
              </h3>
              {featured.subtitle && (
                <p className="text-lg text-ink-soft font-display italic mb-4">
                  {featured.subtitle}
                </p>
              )}
              <p className="text-base text-ink-soft leading-relaxed mb-5 max-w-3xl">
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-mute">
                <span>Updated {formatDate(featured.updated)}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
            </Link>
          )}

          {articles.length > 1 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.slice(1, 5).map((a) => (
                <Link
                  key={a.slug}
                  to={`/guides/${a.slug}`}
                  className="group block p-6 bg-background border border-border hover:border-ink transition-colors"
                >
                  <div className="text-xs uppercase tracking-widest text-accent font-mono mb-3">
                    {a.category}
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium leading-snug mb-2 group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {a.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 font-display text-lg text-ink hover:text-sea transition-colors group"
            >
              <span>See all guides</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============== DIRECTORY ============== */}
      <section className="border-b border-border">
        <div className="container max-w-6xl py-20">
          <SectionHead num="06" label="Directory" subhead="Vetted partners across the four-year customer journey. Affiliate links earn a fee. Independent listings don't. Both are tagged so you can tell.">
            Six categories. <span className="italic">Reviewed before listed.</span>
          </SectionHead>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <DirCard
              letter="A"
              category="Visa & Relocation Agents"
              title="Three Maltese firms with end-to-end NRP service."
              body="Reviewed for response time, fee transparency, and whether they handle the renewal years — not just the initial application."
              tags={[{ label: 'Vetted' }, { label: 'Independent', kind: 'ind' }, { label: 'English' }]}
              cta="View the three firms"
            />
            <DirCard
              letter="B"
              category="Health Insurance"
              title="Policies accepted by Residency Malta Agency."
              body="Not every 'digital nomad' plan passes the RMA review. SafetyWing, Genki, and Cigna all have qualifying tiers — but the exclusions matter."
              tags={[{ label: 'RMA-accepted' }, { label: 'Affiliate', kind: 'aff' }, { label: 'Compared' }]}
              cta="Compare the three"
            />
            <DirCard
              letter="C"
              category="Banking"
              title="Wise vs Revolut Business vs Maltese banks."
              body="Most NRP holders never need a Maltese bank account. The exception is the renewal-year tax filing, where a local IBAN simplifies things."
              tags={[{ label: 'Year 2+' }, { label: 'Affiliate', kind: 'aff' }, { label: 'EU IBAN' }]}
              cta="Read the comparison"
            />
            <DirCard
              letter="D"
              category="Coworking"
              title="Eight spaces, reviewed in person."
              body="Day rates, monthly memberships, ambient noise levels, internet speeds, and whether the listed opening hours match reality."
              tags={[{ label: 'Visited' }, { label: 'Day rates' }, { label: 'Wi-Fi tested' }]}
              cta="See the eight spaces"
            />
            <DirCard
              letter="E"
              category="Apartments & Landlords"
              title="Four agencies with foreign-tenant track record."
              body="Malta's summer rental market is tight. These agencies respond to NRP applicants and don't add hidden commission."
              tags={[{ label: 'Long-let' }, { label: 'Independent', kind: 'ind' }, { label: 'English contracts' }]}
              cta="View the list"
            />
            <DirCard
              letter="F"
              category="Tax Accountants"
              title="Three accountants who file the 10% return cleanly."
              body="Quote in writing, file by deadline, won't push an unnecessary Maltese company structure. €600–€1,200 typical annual fee."
              tags={[{ label: 'Year 2+' }, { label: 'Independent', kind: 'ind' }, { label: 'English filing' }]}
              cta="Read recommendations"
            />
          </div>

          <p className="mt-10 text-sm text-ink-mute italic max-w-3xl">
            Directory pages publishing alongside the content calendar. Partner outreach in progress — featured slots open from week 4.
          </p>
        </div>
      </section>

      {/* ============== CHEAT SHEET / EMAIL CAPTURE ============== */}
      <section className="border-b border-border bg-paper">
        <div className="container max-w-3xl py-20 text-center">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-6">
            № 07 / One-page summary
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink font-medium leading-tight mb-6">
            The Malta Nomad Permit <span className="italic">Cheat Sheet</span>, 2026.
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto mb-10">
            One PDF. The income floor, document checklist, realistic cost breakdown, and rejection patterns — on a single page you can hand to your accountant.
          </p>
          <CheatSheetForm />
          <p className="mt-5 text-xs text-ink-mute">
            No spam. Unsubscribe anytime. Updated whenever the regulation changes.
          </p>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="border-b border-border">
        <div className="container max-w-3xl py-20">
          <SectionHead num="08" label="FAQ" subhead="Plain answers to the seven questions readers ask most often. Longer answers in the guides.">
            Quick questions, <span className="italic">straight answers.</span>
          </SectionHead>

          <div className="mt-12 space-y-2">
            <FaqItem q="Can I apply without a job offer?">
              Yes. The NRP requires foreign-sourced remote work, which can be employment with a foreign company, freelance contracts, or running your own foreign-registered business. You do not need — and cannot have — a Maltese employer.
            </FaqItem>
            <FaqItem q="Does the €42,000 include passive income?">
              No. Only income from professional activities counts toward the threshold. Dividends, rental income, and interest don't qualify toward the €42K, although they may help demonstrate financial stability.
            </FaqItem>
            <FaqItem q="How long does the application take?">
              Typically 30 to 60 days from a complete submission. After approval-in-principle, you have 30 days to provide proof of accommodation and health insurance, then biometrics on arrival in Malta. The residence card is issued within two to three weeks of biometrics.
            </FaqItem>
            <FaqItem q="What does it actually cost upfront?">
              Approximately €19,700 for a single applicant — €300 admin fee, €100 card fee, ~€500 health insurance, ~€2,000 in document translation and apostille, and a 12-month lease at typical Sliema/Gzira rates. Family additions raise the per-person fees but do not change the income threshold.
            </FaqItem>
            <FaqItem q="Can the permit lead to citizenship?">
              No. The Nomad Residence Permit does not provide a path to permanent residency or citizenship. Maximum continuous stay is four years (one year, plus three renewals).
            </FaqItem>
            <FaqItem q="Do I have to live in Malta full-time?">
              For renewal, you must spend at least five cumulative months per year in Malta. The Schengen visa-free travel attached to the permit means you can travel within the area for up to 90 days in any 180-day window, but Malta must remain your base.
            </FaqItem>
            <FaqItem q="Is this site legal advice?">
              No. NomadMalta publishes general information drawn from the Residency Malta Agency's published rules and reader experience. For your specific case, consult a licensed Maltese immigration agent — three are listed in the directory above.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* ============== DISCLOSURE STRIP ============== */}
      <section className="bg-background">
        <div className="container max-w-5xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-ink-mute">
            <Disclosure heading="Editorial only" body="Not a law firm. Not a licensed agent. We don't submit applications." />
            <Disclosure heading="How we earn" body="Some links to agents, banks, insurers may pay a referral fee. Our recommendations don't change either way." />
            <Disclosure heading="When this changes" body="Maltese regulations shift. Each guide carries a 'last updated' date. Quarterly review." />
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Inline subcomponents
   ============================================================ */

function SectionHead({
  num,
  label,
  subhead,
  children,
}: {
  num: string;
  label: string;
  subhead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 items-start">
      <div className="font-mono text-xs uppercase tracking-widest text-accent border-t border-ink pt-3 md:pt-4">
        № {num} / {label}
      </div>
      <div className="md:pt-2">
        <h2 className="font-display text-3xl md:text-5xl text-ink font-medium leading-[1.1] tracking-tight mb-4">
          {children}
        </h2>
        <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-3xl">
          {subhead}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-ink font-medium mb-1">
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-ink-mute font-mono">
        {label}
      </div>
    </div>
  );
}

function Job({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="border-t border-ink pt-5">
      <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
        {heading}
      </div>
      <p className="font-display text-lg text-ink leading-snug">{body}</p>
    </div>
  );
}

function EligibilityCard({ n, title, detail }: { n: string; title: string; detail: string }) {
  return (
    <div className="p-6 bg-paper border border-border">
      <div className="font-mono text-xs text-accent mb-3">{n}</div>
      <div className="font-display text-xl text-ink font-medium mb-2">
        {title}
      </div>
      <p className="text-sm text-ink-soft leading-relaxed">{detail}</p>
    </div>
  );
}

function CompareRow({
  label,
  malta,
  cells,
  last,
}: {
  label: string;
  malta: string;
  cells: string[];
  last?: boolean;
}) {
  const borderClass = last ? '' : 'border-b border-border';
  return (
    <tr>
      <td className={`${borderClass} bg-paper py-4 px-5 font-mono text-[11px] uppercase tracking-widest text-ink-soft font-medium align-top`}>
        {label}
      </td>
      <td className={`${borderClass} py-4 px-5 align-top text-ink font-medium border-l-2 border-r-2 border-terracotta bg-terracotta/[0.06]`}>
        {malta}
      </td>
      {cells.map((c, i) => (
        <td key={i} className={`${borderClass} py-4 px-5 align-top text-ink-soft`}>
          {c}
        </td>
      ))}
    </tr>
  );
}

function Takeaway({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div className="bg-background p-6 border-l-[3px] border-terracotta">
      <div className="font-mono text-[10px] uppercase tracking-widest text-terracotta mb-2">
        {label}
      </div>
      <p className="font-display text-base italic text-ink-soft leading-relaxed font-light">
        {body}
      </p>
    </div>
  );
}

function Hood({
  n,
  name,
  tag,
  stats,
}: {
  n: string;
  name: string;
  tag: string;
  stats: [string, string][];
}) {
  return (
    <div className="bg-paper border border-border p-6">
      <div className="font-mono text-xs text-accent mb-2">{n}</div>
      <h4 className="font-display text-2xl text-ink font-medium mb-1">
        {name}
      </h4>
      <div className="text-sm text-ink-soft italic mb-5">{tag}</div>
      <div className="space-y-2">
        {stats.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between text-sm py-2 border-b border-border last:border-b-0"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-ink-mute">
              {k}
            </span>
            <span className="text-ink font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirCard({
  letter,
  category,
  title,
  body,
  tags,
  cta,
}: {
  letter: string;
  category: string;
  title: string;
  body: string;
  tags: { label: string; kind?: 'aff' | 'ind' }[];
  cta: string;
}) {
  return (
    <div className="bg-paper border border-border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-7 w-7 items-center justify-center bg-ink text-background font-mono text-xs font-medium">
          {letter}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          {category}
        </span>
      </div>
      <h4 className="font-display text-lg text-ink font-medium leading-snug mb-3">
        {title}
      </h4>
      <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1">
        {body}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((t) => (
          <span
            key={t.label}
            className={
              t.kind === 'aff'
                ? 'inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-terracotta/10 text-terracotta border border-terracotta/30'
                : t.kind === 'ind'
                ? 'inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-sea/10 text-sea border border-sea/30'
                : 'inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-background text-ink-mute border border-border'
            }
          >
            {t.label}
          </span>
        ))}
      </div>
      <span className="text-sm text-sea font-medium">
        {cta} <span className="text-ink-mute italic">— coming soon</span>
      </span>
    </div>
  );
}

function CheatSheetForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Avoid double-mounting in StrictMode dev or re-renders
    if (containerRef.current.dataset.mounted === 'true') return;
    containerRef.current.dataset.mounted = 'true';

    // Inject Beehiiv script INSIDE the container.
    // Beehiiv's loader, when injected next to a div, renders the form into
    // that container — avoiding the race condition with React mounting.
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.async = true;
    script.setAttribute(
      'data-beehiiv-form',
      '7e559a88-ac71-4495-9701-87d4fc89f8b3'
    );
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div ref={containerRef} />
    </div>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group hover:text-sea transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
      >
        <span className="font-display text-lg md:text-xl text-ink font-medium leading-snug group-hover:text-sea transition-colors">
          {q}
        </span>
        <span className="font-mono text-xl text-accent flex-shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-base text-ink-soft leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

function Disclosure({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-widest text-ink mb-2">
        {heading}
      </div>
      <p className="leading-relaxed">{body}</p>
    </div>
  );
}
