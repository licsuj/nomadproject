import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, formatDate } from '@/lib/articles';
import useSeo from '@/lib/useSeo';
import { website, withOrg } from '@/lib/schema';

/** FAQ content — rendered on the page and reused for FAQPage structured data. */
const faqs: { q: string; a: string }[] = [
  {
    q: 'Can I apply without a job offer?',
    a: 'Yes. The NRP requires foreign-sourced remote work, which can be employment with a foreign company, freelance contracts, or running your own foreign-registered business. You do not need — and cannot have — a Maltese employer.',
  },
  {
    q: 'Does the €42,000 include passive income?',
    a: "No. Only income from professional activities counts toward the threshold. Dividends, rental income, and interest don't qualify toward the €42K, although they may help demonstrate financial stability.",
  },
  {
    q: 'How long does the application take?',
    a: 'Typically 30 to 60 days from a complete submission. After approval-in-principle, you have 30 days to provide proof of accommodation and health insurance, then biometrics on arrival in Malta. The residence card is issued within two to three weeks of biometrics.',
  },
  {
    q: 'What does it actually cost upfront?',
    a: 'Approximately €19,700 for a single applicant — €300 admin fee, €100 card fee, ~€500 health insurance, ~€2,000 in document translation and apostille, and a 12-month lease at typical Sliema/Gzira rates. Family additions raise the per-person fees but do not change the income threshold.',
  },
  {
    q: 'Can the permit lead to citizenship?',
    a: 'No. The Nomad Residence Permit does not provide a path to permanent residency or citizenship. Maximum continuous stay is four years (one year, plus three renewals).',
  },
  {
    q: 'Do I have to live in Malta full-time?',
    a: 'For renewal, you must spend at least five cumulative months per year in Malta. The Schengen visa-free travel attached to the permit means you can travel within the area for up to 90 days in any 180-day window, but Malta must remain your base.',
  },
  {
    q: 'Is this site legal advice?',
    a: "No. NomadMalta publishes general information drawn from the Residency Malta Agency's published rules and reader experience. For your specific case, consult a licensed Maltese immigration agent — three are listed in the directory above.",
  },
];

export default function HomePage() {
  useSeo({
    title: 'NomadMalta — The Malta nomad permit, without the brochure copy',
    description:
      'Live in Malta on the Nomad Residence Permit: the real upfront cost, who qualifies, the 10% flat tax, and who shouldn\'t apply. Independent guides written from Malta.',
    canonicalPath: '/',
    jsonLd: withOrg(website, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = getAllArticles();
  const featured = articles[0];

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="container max-w-5xl pt-12 pb-12 md:pt-24 md:pb-16">
        <div className="eyebrow live-dot mb-5">Independent · Written from Malta · Updated quarterly</div>
        <h1 className="display text-[40px] leading-[1] md:text-7xl max-w-4xl mb-6">
          Live in Malta on the nomad permit. <em>Know the real numbers first.</em>
        </h1>
        <p className="text-lg md:text-2xl text-ink-soft leading-relaxed max-w-3xl">
          The Nomad Residence Permit lets non-EU remote workers base
          themselves in Malta for up to four years, with a 10% flat tax from
          year two. This site covers what the brochures skip: the real cost,
          the eligibility traps, and who shouldn't bother.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#fit" className="btn-y">Check if it fits you</a>
          <Link to="/guides/2026-malta-nrp-guide" className="btn-o">Read the 2026 guide</Link>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 max-w-4xl">
          <Stat value="4 years" label="Maximum stay" />
          <Stat value="10%" label="Flat tax, year 2+" />
          <Stat value="€42K" label="Minimum income / year" />
          <Stat value="~€19,700" label="Real upfront cost, one person" />
        </dl>
      </section>

      {/* ============== FIT ============== */}
      <Section id="fit">
        <SectionHead label="Is it for you?" subhead="The short version of the “Who shouldn't apply” section in the 2026 guide.">
          A good fit for some. <em>The wrong move for others.</em>
        </SectionHead>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="card p-5 md:p-6">
            <h3 className="eyebrow mb-4 text-sea">Likely a good fit if you</h3>
            <ul className="grid gap-3 text-[15px] text-ink-soft">
              <FitItem good>Earn well above €42K from foreign clients or a foreign employer</FitItem>
              <FitItem good>Want an EU base with English as an official language</FitItem>
              <FitItem good>Plan to stay one to four years, not forever</FitItem>
              <FitItem good>Can spend at least five months a year in Malta</FitItem>
            </ul>
          </div>
          <div className="card p-5 md:p-6">
            <h3 className="eyebrow mb-4 text-flag">Probably not if you</h3>
            <ul className="grid gap-3 text-[15px] text-ink-soft">
              <FitItem>Earn close to the €42K floor with no path to growth</FitItem>
              <FitItem>Want a path to citizenship or permanent residence</FitItem>
              <FitItem>Have any Maltese client revenue</FitItem>
              <FitItem>Want to keep moving instead of staying 5+ months a year</FitItem>
            </ul>
          </div>
        </div>
        <p className="mt-5 text-base text-ink-soft">
          <Link to="/guides/2026-malta-nrp-guide#who-shouldnt-apply" className="font-semibold text-sea hover:underline">
            The full list, with the reasons
          </Link>{' '}
          — including the tax catch for Americans.
        </p>
      </Section>

      {/* ============== ELIGIBILITY ============== */}
      <Section id="eligibility">
        <SectionHead label="Eligibility" subhead="You don't qualify if you miss one. There's no flexibility on the income floor or the foreign-employer rule.">
          You qualify if you tick <em>all four.</em>
        </SectionHead>
        <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <EligibilityCard n="1" title="Non-EU passport" detail="Non-EU, non-EEA, non-Swiss national. Some countries currently ineligible (Russia, Belarus, Iran, others)." />
          <EligibilityCard n="2" title="€42,000+ from foreign work" detail="Gross annual income from genuinely foreign employment, freelance clients, or your own non-Maltese company." />
          <EligibilityCard n="3" title="€100K health insurance" detail="Annual prepaid policy meeting Malta's minimum coverage table (in force since August 2024). Travel insurance not accepted. UK nationals exempt — they have reciprocal access to Maltese healthcare." />
          <EligibilityCard n="4" title="12-month accommodation" detail="Signed and registered lease (or property purchase) in Malta for the validity period of the permit." />
        </ol>
        <p className="mt-6 text-base text-ink-soft max-w-3xl">
          Missing one?{' '}
          <Link to={`/guides/${featured?.slug ?? '2026-malta-nrp-guide'}`} className="font-semibold text-sea hover:underline">
            Read the full guide
          </Link>{' '}
          for the realistic upfront cost (~€19,000 not €300) and why a small but real percentage of applications get rejected.
        </p>
      </Section>

      {/* ============== COMPARE: 5 COUNTRIES ============== */}
      <Section id="compare" wide>
        <SectionHead label="Compare · Five countries" subhead="The right answer depends on income, family size, and how much rent you can absorb. Numbers current as of Q2 2026.">
          Malta is one of <em>five</em> serious Mediterranean options.
        </SectionHead>

        <div className="card mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Malta compared with Cyprus, Portugal, Greece and Slovenia</caption>
            <thead>
              <tr>
                <th scope="col" className="py-4 px-5 text-left"><span className="sr-only">Measure</span></th>
                <th scope="col" className="bg-grotto py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium text-luzzu">Malta</th>
                {['Cyprus', 'Portugal', 'Greece', 'Slovenia'].map((c) => (
                  <th key={c} scope="col" className="py-4 px-5 text-left font-mono text-[11px] uppercase tracking-widest font-medium text-ink-mute">{c}</th>
                ))}
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

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Takeaway label="Pick Malta if" body={<>You earn over €60K and want the <strong className="font-semibold text-ink">10% flat tax + English by default</strong>. Rent is the trade-off.</>} />
          <Takeaway label="Pick Portugal if" body={<>You're optimising for <strong className="font-semibold text-ink">lifestyle and lower rent</strong>, not tax. NHR is closed.</>} />
          <Takeaway label="Pick Slovenia if" body={<>You want <strong className="font-semibold text-ink">EU access at the lowest income threshold</strong> and don't care about beaches.</>} />
        </div>
      </Section>

      {/* ============== MALTA TEASER ============== */}
      <div className="container max-w-5xl">
        <Link to="/malta" className="card group flex items-center justify-between gap-4 p-5 no-underline">
          <span className="text-base md:text-lg text-ink-soft">
            First time looking at Malta?{' '}
            <span className="font-semibold text-ink group-hover:text-sea">Twelve facts worth knowing</span>
          </span>
          <span aria-hidden="true" className="text-xl text-sea transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* ============== NEIGHBOURHOODS ============== */}
      <Section id="neighbourhoods" wide>
        <SectionHead label="Neighbourhoods" subhead="Where nomads actually live. Walking distance from coworking, English by default, and a long-let market that takes foreign tenants seriously.">
          Four places to base, <em>honestly compared.</em>
        </SectionHead>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Hood name="Sliema" tag="Where most nomads end up" stats={[['1-bed rent', '€1,100–1,500'], ['Coworking spaces', '5+'], ['Trade-off', 'Cost']]} />
          <Hood name="Gzira" tag="Cheaper neighbour, same walk to coworking" stats={[['1-bed rent', '€750–1,100'], ['Coworking spaces', '3'], ['Trade-off', 'Less polished']]} />
          <Hood name="Valletta" tag="Historic centre, limited stock" stats={[['1-bed rent', '€800–1,200'], ['Coworking spaces', '1'], ['Trade-off', 'Tourist density']]} />
          <Hood name="Gozo" tag="Slower pace, roughly half the rent" stats={[['1-bed rent', '€500–750'], ['Coworking spaces', '1'], ['Trade-off', 'Ferry to mainland']]} />
        </div>
      </Section>

      {/* ============== GUIDES ============== */}
      <Section id="guides">
        <SectionHead label="Guides" subhead="Working guides published weekly. Each one fills a gap that immigration firms don't cover — by content choice or commercial conflict.">
          Where to start.
        </SectionHead>

        {featured && (
          <Link to={`/guides/${featured.slug}`} className="panel-dark group mt-8 block rounded-[24px] p-6 md:p-10 no-underline">
            <div className="relative">
              <div className="eyebrow-dark mb-3">{featured.category} · Most read</div>
              <h3 className="font-display text-2xl md:text-4xl font-extrabold leading-tight text-white mb-3 group-hover:underline">
                {featured.title}
              </h3>
              {featured.subtitle && <p className="text-lg text-on-dark mb-3">{featured.subtitle}</p>}
              <p className="text-base text-on-dark-mute leading-relaxed mb-5 max-w-3xl">{featured.description}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-on-dark-mute">
                <span>Updated <time dateTime={featured.updated}>{formatDate(featured.updated)}</time></span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
            </div>
          </Link>
        )}

        {articles.length > 1 && (
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {articles.slice(1, 5).map((a) => (
              <Link key={a.slug} to={`/guides/${a.slug}`} className="card group block p-5 no-underline">
                <div className="eyebrow mb-2 text-sea">{a.category}</div>
                <h3 className="font-display text-xl font-bold leading-snug text-ink mb-2 group-hover:text-sea">{a.title}</h3>
                <p className="text-sm text-ink-mute leading-relaxed">{a.description}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link to="/guides" className="btn-o">See all guides <span aria-hidden="true">→</span></Link>
        </div>
      </Section>

      {/* ============== CHEAT SHEET ============== */}
      <section className="container max-w-5xl pt-16 md:pt-24">
        <div className="panel-dark rounded-[24px] px-6 py-10 md:px-12 md:py-14">
          <div className="relative max-w-2xl">
            <div className="eyebrow-dark mb-4">One-page summary</div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-white mb-5">
              The Malta Nomad Permit Cheat Sheet, 2026.
            </h2>
            <p className="text-lg text-on-dark-mute leading-relaxed mb-8">
              One A4 page. The condensed reference for when you're actually applying — print it, give it to your accountant, keep it on your phone. Everything else lives in the <Link to="/guides" className="font-semibold text-on-dark underline">guides</Link>. This is the page you'll come back to.
            </p>
            <a href="https://nomadmalta.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer" className="btn-y">
              Get the cheat sheet <span aria-hidden="true">→</span>
            </a>
            <p className="mt-4 text-xs text-on-dark-mute">
              We won't email you weekly. Future emails only when regulations change or something significant publishes.
            </p>
          </div>
        </div>
      </section>

      {/* ============== DIRECTORY ============== */}
      <Section id="directory" wide>
        <SectionHead label="Directory" subhead="Vetted partners across the four-year customer journey. Affiliate links earn a fee. Independent listings don't. Both are tagged so you can tell.">
          Six categories. <em>Reviewed before listed.</em>
        </SectionHead>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <DirCard
            category="Visa & Relocation Agents"
            title="Three Maltese firms with end-to-end NRP service."
            body="Reviewed for response time, fee transparency, and whether they handle the renewal years — not just the initial application."
            tags={[{ label: 'Vetted' }, { label: 'Independent', kind: 'ind' }, { label: 'English' }]}
            cta="View the three firms"
          />
          <DirCard
            category="Health Insurance"
            title="Policies accepted by Residency Malta Agency."
            body="Not every 'digital nomad' plan passes the RMA review. SafetyWing, Genki, and Cigna all have qualifying tiers — but the exclusions matter."
            tags={[{ label: 'RMA-accepted' }, { label: 'Affiliate', kind: 'aff' }, { label: 'Compared' }]}
            cta="Compare the three"
          />
          <DirCard
            category="Banking"
            title="Wise vs Revolut Business vs Maltese banks."
            body="Most NRP holders never need a Maltese bank account. The exception is the renewal-year tax filing, where a local IBAN simplifies things."
            tags={[{ label: 'Year 2+' }, { label: 'Affiliate', kind: 'aff' }, { label: 'EU IBAN' }]}
            cta="Read the comparison"
          />
          <DirCard
            category="Coworking"
            title="Eight spaces, reviewed in person."
            body="Day rates, monthly memberships, ambient noise levels, internet speeds, and whether the listed opening hours match reality."
            tags={[{ label: 'Visited' }, { label: 'Day rates' }, { label: 'Wi-Fi tested' }]}
            cta="See the eight spaces"
          />
          <DirCard
            category="Apartments & Landlords"
            title="Four agencies with foreign-tenant track record."
            body="Malta's summer rental market is tight. These agencies respond to NRP applicants and don't add hidden commission."
            tags={[{ label: 'Long-let' }, { label: 'Independent', kind: 'ind' }, { label: 'English contracts' }]}
            cta="View the list"
          />
          <DirCard
            category="Tax Accountants"
            title="Three accountants who file the 10% return cleanly."
            body="Quote in writing, file by deadline, won't push an unnecessary Maltese company structure. €600–€1,200 typical annual fee."
            tags={[{ label: 'Year 2+' }, { label: 'Independent', kind: 'ind' }, { label: 'English filing' }]}
            cta="Read recommendations"
          />
        </div>

        <p className="mt-6 text-sm text-ink-mute max-w-3xl">
          Directory pages publishing alongside the content calendar. Partner outreach in progress — featured slots open from week 4.
        </p>
      </Section>

      {/* ============== FAQ ============== */}
      <Section id="faq">
        <SectionHead label="FAQ" subhead="Plain answers to the seven questions readers ask most often. Longer answers in the guides.">
          Quick questions, <em>straight answers.</em>
        </SectionHead>
        <div className="mt-8 grid gap-2">
          {faqs.map((f) => (
            <details key={f.q} className="card group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left">
                <h3 className="font-display text-lg md:text-xl font-bold leading-snug text-ink group-hover:text-sea">{f.q}</h3>
                <span aria-hidden="true" className="flex-none font-mono text-xl text-sea group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="pb-5 text-base text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ============== WHAT THIS SITE DOES ============== */}
      <Section id="method">
        <SectionHead label="Method" subhead="Four jobs, in the order most readers use them.">
          What this site <em>actually does.</em>
        </SectionHead>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Job heading="Decide" body="Help you work out whether the Malta NRP fits your situation, before you spend money." />
          <Job heading="Compare" body="Side-by-side with Portugal D8, Spain DNV, Greece, Italy, Slovenia. Rent and tax, not just headline numbers." />
          <Job heading="Find" body="Vetted licensed agents, property letting agencies, banks, insurers, accountants — across the four-year journey." />
          <Job heading="Stay" body="Renewal years, the 10% tax in practice, family edge cases, and what comes after year four." />
        </div>
      </Section>

      {/* ============== DISCLOSURE ============== */}
      <section className="container max-w-5xl py-14 md:py-20">
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-8 text-sm text-ink-mute md:grid-cols-3">
          <Disclosure heading="Editorial only" body="Not a law firm. Not a licensed agent. We don't submit applications." />
          <Disclosure heading="How we earn" body="Some links to agents, banks, insurers may pay a referral fee. Our recommendations don't change either way." />
          <Disclosure heading="When this changes" body="Maltese regulations shift. Each guide carries a 'last updated' date. Quarterly review." />
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Inline subcomponents
   ============================================================ */

function Section({ id, wide, children }: { id?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`container ${wide ? 'max-w-6xl' : 'max-w-5xl'} pt-16 md:pt-24 scroll-mt-20`}>
      {children}
    </section>
  );
}

function FitItem({ good, children }: { good?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[12px] font-bold ${
          good ? 'bg-sea/15 text-sea' : 'bg-flag/10 text-flag'
        }`}
      >
        {good ? '✓' : '×'}
      </span>
      <span>{children}</span>
    </li>
  );
}

function SectionHead({ label, subhead, children }: { label: string; subhead: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <div className="eyebrow mb-3">{label}</div>
      <h2 className="display text-[30px] md:text-5xl leading-[1.05] mb-4">{children}</h2>
      <p className="text-base md:text-lg text-ink-soft leading-relaxed">{subhead}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card flex flex-col-reverse p-4">
      <dt className="eyebrow mt-1">{label}</dt>
      <dd className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-grotto tabular-nums">{value}</dd>
    </div>
  );
}

function Job({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="card p-5">
      <h3 className="eyebrow mb-2 text-sea">{heading}</h3>
      <p className="font-display text-lg font-semibold leading-snug text-ink">{body}</p>
    </div>
  );
}

function EligibilityCard({ n, title, detail }: { n: string; title: string; detail: string }) {
  return (
    <li className="card flex gap-4 p-5">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[11px] bg-grotto font-display text-lg font-extrabold text-luzzu">{n}</span>
      <div>
        <h3 className="font-display text-xl font-bold text-ink mb-1">{title}</h3>
        <p className="text-sm text-ink-soft leading-relaxed">{detail}</p>
      </div>
    </li>
  );
}

function CompareRow({ label, malta, cells, last }: { label: string; malta: string; cells: string[]; last?: boolean }) {
  const b = last ? '' : 'border-b border-line';
  return (
    <tr>
      <th scope="row" className={`${b} py-4 px-5 text-left align-top font-mono text-[11px] uppercase tracking-widest font-medium text-ink-mute`}>{label}</th>
      <td className={`${b} bg-grotto/[0.07] py-4 px-5 align-top font-semibold text-ink`}>{malta}</td>
      {cells.map((c, i) => (
        <td key={i} className={`${b} py-4 px-5 align-top text-ink-soft`}>{c}</td>
      ))}
    </tr>
  );
}

function Takeaway({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="eyebrow mb-2 text-sea">{label}</div>
      <p className="text-base text-ink-soft leading-relaxed">{body}</p>
    </div>
  );
}

function Hood({ name, tag, stats }: { name: string; tag: string; stats: [string, string][] }) {
  return (
    <div className="card p-5">
      <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{name}</h3>
      <p className="text-sm text-ink-mute mb-4">{tag}</p>
      <dl className="grid gap-0">
        {stats.map(([k, v]) => (
          <div key={k} className="flex justify-between border-t border-line py-2.5 text-sm">
            <dt className="eyebrow">{k}</dt>
            <dd className="font-semibold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DirCard({
  category,
  title,
  body,
  tags,
  cta,
}: {
  category: string;
  title: string;
  body: string;
  tags: { label: string; kind?: 'aff' | 'ind' }[];
  cta: string;
}) {
  return (
    <div className="card flex flex-col p-5">
      <div className="eyebrow mb-3">{category}</div>
      <h3 className="font-display text-lg font-bold leading-snug text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-4 flex-1">{body}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((t) => (
          <span
            key={t.label}
            className={`chip ${
              t.kind === 'aff' ? 'bg-luzzu/25 text-ink' : t.kind === 'ind' ? 'bg-sea/10 text-sea' : 'bg-salt text-ink-mute'
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>
      <span className="text-sm font-semibold text-sea">
        {cta} <span className="font-normal text-ink-mute">— coming soon</span>
      </span>
    </div>
  );
}

function Disclosure({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h3 className="eyebrow mb-2 text-ink">{heading}</h3>
      <p className="leading-relaxed">{body}</p>
    </div>
  );
}
