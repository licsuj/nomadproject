/**
 * Shared JSON-LD building blocks (schema.org). Only facts already on the site are used.
 */
import { SITE_NAME, SITE_ORIGIN } from '@/lib/useSeo';
import type { Article } from '@/lib/articles';

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  email: 'hello@nomadmalta.com',
  description:
    'Independent editorial coverage of the Malta Nomad Residence Permit, written from Malta.',
};

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  inLanguage: 'en',
  description: 'Working guides on the Malta Nomad Residence Permit, written from Malta.',
  publisher: { '@id': `${SITE_ORIGIN}/#organization` },
};

export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_ORIGIN}${path}`,
    })),
  };
}

export function articleSchema(a: Article) {
  const url = `${SITE_ORIGIN}/guides/${a.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    ...(a.subtitle ? { alternativeHeadline: a.subtitle } : {}),
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: 'en',
    articleSection: a.category,
    author: { '@id': `${SITE_ORIGIN}/#organization` },
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@type': 'Thing', name: 'Malta Nomad Residence Permit' },
  };
}

export function withOrg(...items: Record<string, unknown>[]) {
  return [{ '@context': 'https://schema.org', ...organization }, ...items];
}
