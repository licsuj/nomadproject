import { Link } from 'react-router-dom';
import useSeo from '@/lib/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Not found — NomadMalta' });

  return (
    <div className="container max-w-3xl py-32 text-center">
      <div className="text-xs uppercase tracking-widest text-accent font-mono mb-6">
        404
      </div>
      <h1 className="font-display text-4xl md:text-5xl text-ink font-medium mb-6">
        That page isn't here.
      </h1>
      <p className="text-lg text-ink-soft mb-10">
        It may have moved, or it may not have been written yet. The content
        calendar is being published one article per week.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-ink text-background hover:bg-ink-soft transition-colors text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/guides"
          className="px-6 py-3 border border-ink text-ink hover:bg-paper transition-colors text-sm font-medium"
        >
          All guides
        </Link>
      </div>
    </div>
  );
}
