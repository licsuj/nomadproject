import { Link, useLocation } from 'react-router-dom';

export default function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-border bg-background">
      <div className="container max-w-6xl flex items-center justify-between py-5">
        <Link
          to="/"
          className="font-display text-xl text-ink font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          NomadMalta
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          {!isHome && (
            <Link
              to="/"
              className="text-ink-soft hover:text-ink transition-colors"
            >
              Home
            </Link>
          )}
          <Link
            to="/guides"
            className="text-ink-soft hover:text-ink transition-colors"
          >
            Guides
          </Link>
          <Link
            to="/guides/2026-malta-nrp-guide"
            className="text-ink-soft hover:text-ink transition-colors"
          >
            Start here
          </Link>
        </nav>
      </div>
    </header>
  );
}
