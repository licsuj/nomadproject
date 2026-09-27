import { Link } from 'react-router-dom';
import useSeo from '@/lib/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Not found — NomadMalta', noindex: true });

  return (
    <div className="container max-w-3xl py-24 md:py-32 text-center">
      <div className="eyebrow mb-5">404</div>
      <h1 className="display text-4xl md:text-5xl mb-5">That page isn't here.</h1>
      <p className="text-lg text-ink-soft mb-10">
        It may have moved, or it may not have been written yet. The content
        calendar is being published one article per week.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-y">Home</Link>
        <Link to="/guides" className="btn-o">All guides</Link>
      </div>
    </div>
  );
}
