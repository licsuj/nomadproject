/**
 * Article loader.
 *
 * Loads all .md files from src/content/articles/ at build time via Vite's
 * import.meta.glob. Parses YAML frontmatter with a minimal custom parser
 * (we only ever have string and number values, so no need for js-yaml).
 */

export interface Article {
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  published: string;
  updated: string;
  readingTime: string;
  category: string;
  order: number;
  body: string;
}

interface RawFrontmatter {
  [key: string]: string | number;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: RawFrontmatter; body: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error(
      'Article missing frontmatter. Every article needs a --- block at the top.'
    );
  }

  const [, frontmatterBlock, body] = match;
  const data: RawFrontmatter = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();

    // Strip surrounding quotes (both " and ')
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Convert numeric strings to numbers (used for `order`)
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }

  return { data, body };
}

const modules = import.meta.glob('/src/content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const articles: Article[] = Object.values(modules)
  .map((raw) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      title: data.title as string,
      subtitle: data.subtitle as string | undefined,
      slug: data.slug as string,
      description: data.description as string,
      published: data.published as string,
      updated: data.updated as string,
      readingTime: data.readingTime as string,
      category: data.category as string,
      order: data.order as number,
      body: body.trim(),
    };
  })
  .sort((a, b) => a.order - b.order);

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== slug).slice(0, limit);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  // UTC so the prerendered date and the browser date always match
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** The article's H2 headings, in order (used for the "On this page" list). */
export function getHeadings(body: string): string[] {
  return body
    .split(/\r?\n/)
    .filter((l) => /^##\s+/.test(l))
    .map((l) => l.replace(/^##\s+/, '').replace(/[*_`]/g, '').trim());
}
