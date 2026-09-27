import { Link, NavLink } from 'react-router-dom';

const nav = [
  { to: '/malta', label: 'Malta' },
  { to: '/guides', label: 'Guides' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-salt/90 backdrop-blur supports-[backdrop-filter]:bg-salt/75">
      <div className="container max-w-6xl flex items-center justify-between gap-4 py-3.5">
        <Link to="/" className="flex items-center gap-2 no-underline" aria-label="NomadMalta home">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] flex-none" aria-hidden="true">
            <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" fill="#C62D26" />
            <circle cx="12" cy="10" r="2.6" fill="#fff" />
          </svg>
          <span className="font-display text-[19px] font-extrabold tracking-tight text-ink">NomadMalta</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2 text-[14px] font-semibold">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `hidden sm:inline-flex rounded-full px-3 py-2 no-underline transition-colors ${
                  isActive ? 'bg-card text-ink' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/guides" className="sm:hidden rounded-full px-2 py-2 text-ink-soft no-underline">
            Guides
          </Link>
          <Link
            to="/guides/2026-malta-nrp-guide"
            className="inline-flex min-h-[38px] items-center whitespace-nowrap rounded-full bg-luzzu px-3.5 sm:px-4 font-bold text-ink no-underline hover:brightness-95"
          >
            Start here
          </Link>
        </nav>
      </div>
    </header>
  );
}
