import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description?: string;
  /** Path-only canonical (e.g. "/guides/...") — combined with site origin */
  canonicalPath?: string;
  /** Optional JSON-LD structured data object — will be stringified into a script tag */
  jsonLd?: Record<string, unknown>;
}

const SITE_ORIGIN = 'https://nomadmalta.com';

/**
 * Sets document <title>, <meta name="description">, canonical link,
 * and a JSON-LD structured data script for the current page.
 * Cleans up the JSON-LD on unmount so pages don't accumulate stale schema.
 */
export default function useSeo({
  title,
  description,
  canonicalPath,
  jsonLd,
}: SeoOptions) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);

      // Open Graph fallback for social previews
      let og = document.querySelector('meta[property="og:description"]');
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', 'og:description');
        document.head.appendChild(og);
      }
      og.setAttribute('content', description);
    }

    // Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Canonical URL
    if (canonicalPath) {
      const fullUrl = `${SITE_ORIGIN}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', fullUrl);

      // og:url too
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', fullUrl);
    }

    // JSON-LD structured data
    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.dataset.seoManaged = 'true';
      scriptEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    // Cleanup: remove the JSON-LD on unmount so different pages don't stack
    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, canonicalPath, jsonLd]);
}
