import { createContext, useContext, useEffect } from 'react';

export interface SeoOptions {
  title: string;
  description?: string;
  /** Path-only canonical (e.g. "/guides/...") — combined with site origin */
  canonicalPath?: string;
  /** og:type — "website" by default, "article" for guides */
  ogType?: 'website' | 'article';
  /** One or more JSON-LD objects. Several are combined into one @graph. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set true on pages that should not be indexed (404) */
  noindex?: boolean;
}

export const SITE_ORIGIN = 'https://nomadmalta.com';
export const SITE_NAME = 'NomadMalta';

/**
 * During prerender (scripts/prerender.mjs) a collector is provided through this
 * context, so the page's SEO data can be written into the static HTML <head>.
 * In the browser there is no provider, and the effect below keeps <head> in sync
 * when the reader navigates between pages.
 */
export const SeoContext = createContext<{ current?: SeoOptions } | null>(null);

function jsonLdString(jsonLd: SeoOptions['jsonLd']): string | null {
  if (!jsonLd) return null;
  const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const data =
    list.length === 1
      ? list[0]
      : {
          '@context': 'https://schema.org',
          '@graph': list.map((item) => {
            const { ['@context']: _ctx, ...rest } = item;
            void _ctx;
            return rest;
          }),
        };
  // Escape "<" so article text can never close the script tag
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const escAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Head tags as an HTML string, used by the prerender script. */
export function renderHeadTags(seo: SeoOptions): string {
  const tags: string[] = [];
  const url = seo.canonicalPath ? `${SITE_ORIGIN}${seo.canonicalPath}` : undefined;
  tags.push(`<title>${escAttr(seo.title)}</title>`);
  if (seo.description) tags.push(`<meta name="description" content="${escAttr(seo.description)}" />`);
  if (seo.noindex) tags.push(`<meta name="robots" content="noindex" />`);
  if (url) tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
  tags.push(`<meta property="og:type" content="${seo.ogType ?? 'website'}" />`);
  tags.push(`<meta property="og:title" content="${escAttr(seo.title)}" />`);
  if (seo.description) tags.push(`<meta property="og:description" content="${escAttr(seo.description)}" />`);
  if (url) tags.push(`<meta property="og:url" content="${url}" />`);
  tags.push(`<meta name="twitter:card" content="summary" />`);
  tags.push(`<meta name="twitter:title" content="${escAttr(seo.title)}" />`);
  if (seo.description) tags.push(`<meta name="twitter:description" content="${escAttr(seo.description)}" />`);
  const ld = jsonLdString(seo.jsonLd);
  if (ld) tags.push(`<script type="application/ld+json" data-seo-managed="true">${ld}</script>`);
  return tags.join('\n    ');
}

function setMeta(attr: 'name' | 'property', key: string, value: string | undefined) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!value) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Sets <title>, description, canonical, Open Graph / Twitter tags and JSON-LD
 * for the current page — in the prerendered HTML and on client-side navigation.
 */
export default function useSeo(seo: SeoOptions) {
  const collector = useContext(SeoContext);
  if (collector) collector.current = seo;

  const ld = jsonLdString(seo.jsonLd);
  const { title, description, canonicalPath, ogType, noindex } = seo;

  useEffect(() => {
    document.title = title;
    const url = canonicalPath ? `${SITE_ORIGIN}${canonicalPath}` : undefined;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex' : undefined);
    setMeta('property', 'og:type', ogType ?? 'website');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (url) {
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    } else {
      link?.remove();
    }

    // Replace any JSON-LD from the prerendered HTML or the previous page
    document.head.querySelectorAll('script[data-seo-managed]').forEach((s) => s.remove());
    let scriptEl: HTMLScriptElement | null = null;
    if (ld) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.dataset.seoManaged = 'true';
      scriptEl.textContent = ld;
      document.head.appendChild(scriptEl);
    }
    return () => {
      scriptEl?.remove();
    };
  }, [title, description, canonicalPath, ogType, noindex, ld]);
}
