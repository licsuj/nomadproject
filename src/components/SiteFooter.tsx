import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="panel-dark mt-0">
      <div className="container max-w-6xl relative py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="font-display text-xl font-extrabold text-white mb-3">NomadMalta</div>
            <p className="text-sm leading-relaxed text-on-dark-mute">
              Independent editorial coverage of the Malta Nomad Residence
              Permit, written from Malta.
            </p>
          </div>
          <div>
            <div className="eyebrow-dark mb-3">Read</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guides" className="text-on-dark hover:text-white no-underline">All guides</Link></li>
              <li><Link to="/guides/2026-malta-nrp-guide" className="text-on-dark hover:text-white no-underline">The 2026 Permit Guide</Link></li>
              <li><Link to="/malta" className="text-on-dark hover:text-white no-underline">Malta in 12 facts</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow-dark mb-3">About</div>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link to="/about" className="text-on-dark hover:text-white no-underline">About this site</Link></li>
              <li>
                <a href="mailto:hello@nomadmalta.com" className="text-on-dark hover:text-white no-underline">
                  hello@nomadmalta.com
                </a>
              </li>
            </ul>
            <p className="text-xs leading-relaxed text-on-dark-mute">
              Not a law firm. Not a licensed agent. Editorial only.
              Recommendations may include affiliate or referral links.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-on-dark-mute">
          © {new Date().getFullYear()} NomadMalta · Information only · Not
          legal, tax, or immigration advice
        </div>
      </div>
    </footer>
  );
}
