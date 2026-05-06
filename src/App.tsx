import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import GuidesIndexPage from '@/pages/GuidesIndexPage';
import ArticlePage from '@/pages/ArticlePage';
import MaltaFactsPage from '@/pages/MaltaFactsPage';
import AboutPage from '@/pages/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/malta" element={<MaltaFactsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guides" element={<GuidesIndexPage />} />
          <Route path="/guides/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
