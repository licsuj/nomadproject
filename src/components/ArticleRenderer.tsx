import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleRendererProps {
  body: string;
}

/** Plain text of a heading's children */
export function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : isValidElement(c) ? textOf((c.props as { children?: ReactNode }).children) : ''))
    .join('');
}

/** URL-safe id for a heading, e.g. "Step 1: Preliminary check" -> "step-1-preliminary-check" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Renders article markdown with editorial typography.
 * H2/H3 get stable ids so readers, search engines and AI answers can link to a section.
 */
export default function ArticleRenderer({ body }: ArticleRendererProps) {
  return (
    <article className="prose-nomadmalta">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
        }}
      >
        {body}
      </ReactMarkdown>
    </article>
  );
}
