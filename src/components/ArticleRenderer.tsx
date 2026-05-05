import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleRendererProps {
  body: string;
}

/**
 * Renders article markdown body with editorial typography.
 * Wraps in `prose-nomadmalta` class which is defined in src/styles/index.css.
 */
export default function ArticleRenderer({ body }: ArticleRendererProps) {
  return (
    <article className="prose-nomadmalta">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </article>
  );
}
