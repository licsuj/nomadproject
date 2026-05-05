import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="font-display text-lg text-ink font-medium mb-3">
              NomadMalta
            </div>
            <p className="text-sm text-ink-mute leading-relaxed">
              Independent editorial coverage of the Malta Nomad Residence
              Permit, written from Malta.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-mute font-mono mb-3">
              Read
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/guides"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  All guides
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/2026-malta-nrp-guide"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  The 2026 Permit Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-mute font-mono mb-3">
              About
            </div>
            <p className="text-sm text-ink-mute leading-relaxed">
              Not a law firm. Not a licensed agent. Editorial only.
              Recommendations may include affiliate or referral links.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-xs text-ink-mute">
          © {new Date().getFullYear()} NomadMalta · Information only · Not
          legal, tax, or immigration advice
        </div>
      </div>
    </footer>
  );
}
