import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo, { SITE_ORIGIN } from '@/lib/useSeo';
import { breadcrumbs, withOrg } from '@/lib/schema';

export default function AboutPage() {
  useSeo({
    title: 'About — NomadMalta',
    description:
      'Why NomadMalta exists, who writes it, how it stays accurate, and how it makes money. Honest disclosure on affiliate relationships and editorial independence.',
    canonicalPath: '/about',
    jsonLd: withOrg(
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About NomadMalta',
        url: `${SITE_ORIGIN}/about`,
        description: 'About NomadMalta — editorial mission, ownership, and disclosure.',
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        mainEntity: { '@id': `${SITE_ORIGIN}/#organization` },
      },
      breadcrumbs([
        ['Home', '/'],
        ['About', '/about'],
      ])
    ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ============== HERO ============== */}
      <header className="container max-w-3xl pt-12 pb-6 md:pt-20">
        <div className="eyebrow live-dot mb-4">About this site</div>
        <h1 className="display text-[36px] md:text-6xl leading-[1.02] mb-5">
          What this site is for, and <em>how it stays honest.</em>
        </h1>
        <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
          NomadMalta exists because the existing guides are written either by
          licensed agents who can&rsquo;t criticise their own industry, or by
          offshore content farms that have never been to Malta. The gap is
          real.
        </p>
      </header>

      {/* ============== BODY ============== */}
      <section>
        <div className="container max-w-3xl pb-16 md:pb-20">
          <article className="prose-nomadmalta card p-5 md:p-10">
            <h2>Who writes this</h2>

            <p>
              NomadMalta is written by an independent editor based in Malta.
              The editorial voice is one person, not a content team. That
              choice is deliberate. It keeps the writing direct, the tone
              consistent, and the responsibility for every claim sitting with
              one identifiable human.
            </p>

            <p>
              No employees, no investors, no agency parent. The site is
              self-funded and self-published. There is no editorial board,
              there are no sponsored posts, and there is no advertising
              network running in the background. The only revenue mechanism
              is the affiliate disclosure described below.
            </p>

            <h2>Why this site exists</h2>

            <p>
              Most published guidance on the Malta Nomad Residence Permit
              comes from one of two sources. The first is the websites of
              licensed immigration agents. These pages are useful, but they
              have structural limits: they cannot say no to a prospective
              client, they cannot rank competing firms, and they cannot
              criticise the programme itself. The second source is offshore
              SEO content from publishers who have never been to Malta, never
              applied for the permit, and recycle the same outdated figures
              across dozens of nearly-identical pages.
            </p>

            <p>
              The result is that the practical questions a real applicant
              asks &mdash; what does it actually cost, why do applications get
              rejected, who should I trust, what happens at renewal, what
              does the 10% tax look like in practice &mdash; have no good
              public answers. This site is an attempt to write those
              answers.
            </p>

            <h2>How accuracy works here</h2>

            <p>
              Every claim about a number, a fee, a date, or a regulation is
              checked against an authoritative source: Residency Malta
              Agency&rsquo;s published documents, the Income Tax Rules, the
              Health Coverage Table of Minimum Benefits, the Department of
              Industrial and Employment Relations, and the gov.mt portal.
              Where multiple sources disagree, the official one wins, and we
              flag the discrepancy in the article.
            </p>

            <p>
              Several common errors persist in widely-cited guides. The
              residence card fee is currently &euro;100, not &euro;27.50.
              The minimum health insurance coverage has been &euro;100,000
              since August 2024, not &euro;30,000. Aġenzija Komunità Malta
              handles citizenship matters, not the Nomad Residence Permit
              &mdash; that&rsquo;s the Residency Malta Agency. We&rsquo;ve corrected
              versions of these errors that we ourselves got wrong. We expect
              to make more, and we&rsquo;ll correct those too.
            </p>

            <p>
              Articles are reviewed quarterly and updated whenever the
              regulation changes. The &ldquo;Updated&rdquo; date at the top of each
              article is the actual last-edited date, not a rolling display
              trick.
            </p>

            <h2>How this site makes money</h2>

            <p>
              <strong>The honest version.</strong> NomadMalta has affiliate
              relationships with two categories of service provider in
              Malta: licensed immigration agents who handle Nomad Residence
              Permit applications, and property letting agencies that work
              with foreign tenants on long leases. When a reader of this
              site contacts one of these providers and engages them, the
              provider pays NomadMalta a referral fee. For a successful
              immigration agent referral, the typical fee is &euro;100&ndash;&euro;500.
              For a successful long-let property referral, the typical fee
              is half-month rent commission split with the agency
              (&euro;100&ndash;&euro;600 per let).
            </p>

            <p>
              <strong>What this means for you.</strong> The fee comes out
              of the provider&rsquo;s margin, not your pocket. You pay the same
              whether you find them through this site or directly. We
              disclose the relationship on every page where we recommend
              specific providers, and we never list a firm we wouldn&rsquo;t use
              ourselves.
            </p>

            <p>
              <strong>What we don&rsquo;t do.</strong> No paid placements. No
              sponsored content disguised as editorial. No
              pay-to-be-featured directories. No display advertising. No
              data brokerage of subscriber emails. No upsells on
              &ldquo;premium&rdquo; tiers of the existing content.
            </p>

            <p>
              <strong>Why we tell you.</strong> Affiliate disclosure is a
              legal requirement in most jurisdictions, including the EU and
              the US. It&rsquo;s also a credibility test: a publication that
              hides its incentives is one you can&rsquo;t trust. We&rsquo;d rather
              tell you straight, lose the readers who object, and earn the
              trust of the ones who don&rsquo;t.
            </p>

            <h2>What we won&rsquo;t do for money</h2>

            <p>
              We don&rsquo;t recommend providers we wouldn&rsquo;t engage ourselves.
              We don&rsquo;t soften criticism of agents or programmes because
              someone in the supply chain is paying us. We don&rsquo;t take
              referral fees from providers based outside Malta who have no
              accountability to Maltese law. We don&rsquo;t accept money to
              remove unfavourable content. We don&rsquo;t tier readers into
              &ldquo;free&rdquo; vs &ldquo;paid&rdquo; access &mdash; the entire site is and will
              remain free.
            </p>

            <p>
              If a partnership ever required compromising any of the above,
              we&rsquo;d end the partnership.
            </p>

            <h2>What we&rsquo;re not</h2>

            <p>
              We are not a licensed immigration agent. We do not prepare
              applications, file documents, or represent clients before
              Residency Malta. If you need that, the{' '}
              <Link to="/guides/choosing-immigration-agent">
                agent comparison guide
              </Link>{' '}
              walks through how to choose one. We are also not a law firm
              and not a tax advisor. The content on this site is research
              and editorial commentary, not legal or financial advice.
            </p>

            <p>
              For decisions involving significant money or legal exposure,
              talk to a licensed professional in Malta. We&rsquo;ll happily
              point you at credible ones.
            </p>

            <h2>Get in touch</h2>

            <p>
              Corrections, factual challenges, and reader questions go to{' '}
              <a href="mailto:hello@nomadmalta.com">hello@nomadmalta.com</a>.
              The inbox is read by a human within 48 hours on weekdays.
              Genuine corrections are applied promptly and credited in the
              article&rsquo;s update note.
            </p>

            <p>
              Partnership enquiries from licensed Maltese providers go to
              the same address. Cold marketing from offshore content
              agencies is filtered automatically and not read.
            </p>
          </article>
        </div>
      </section>

      {/* ============== POSTSCRIPT CTA ============== */}
      <section className="panel-dark">
        <div className="container max-w-3xl relative py-14 md:py-16">
          <div className="eyebrow-dark mb-4">Start</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-6">
            The flagship guide is the right starting point.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/guides/2026-malta-nrp-guide" className="btn-y">The 2026 NRP guide</Link>
            <Link to="/guides" className="btn border-[1.5px] border-on-dark text-on-dark hover:bg-white/10">All guides</Link>
          </div>
        </div>
      </section>
    </>
  );
}
