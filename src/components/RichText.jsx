import { isRichDoc, safeHref } from '@/lib/richText';

/**
 * Renders a Tiptap/ProseMirror document as React elements.
 *
 * Deliberately not `dangerouslySetInnerHTML` — see the note at the top of
 * lib/richText.js. Unknown node types are skipped rather than rendered, so a
 * malformed or hostile document can only ever produce less output, never
 * script execution.
 */

// Inline marks, applied innermost-first.
const MARK_ELEMENTS = {
  bold: 'strong',
  italic: 'em',
  underline: 'u',
  strike: 's',
  code: 'code',
};

function renderText(node, key) {
  let element = node.text;

  const marks = Array.isArray(node.marks) ? node.marks : [];

  // Links wrap the text first so formatting marks sit inside the anchor.
  const linkMark = marks.find((mark) => mark.type === 'link');
  const otherMarks = marks.filter((mark) => mark.type !== 'link');

  otherMarks.forEach((mark, index) => {
    const Tag = MARK_ELEMENTS[mark.type];
    if (!Tag) return;
    element = (
      <Tag key={`${key}-m${index}`} className={Tag === 'code' ? 'px-1.5 py-0.5 rounded bg-brand-softblue text-brand-blue text-[0.9em]' : undefined}>
        {element}
      </Tag>
    );
  });

  if (linkMark) {
    const href = safeHref(linkMark.attrs?.href);
    if (href) {
      const isExternal = /^https?:\/\//i.test(href);
      element = (
        <a
          key={`${key}-link`}
          href={href}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
            : {})}
          className="text-brand-blue font-semibold underline decoration-brand-blue/30 hover:decoration-brand-blue underline-offset-2 transition"
        >
          {element}
        </a>
      );
    }
  }

  return <span key={key}>{element}</span>;
}

function renderNodes(nodes) {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, index) => renderNode(node, `n${index}`));
}

function renderNode(node, key) {
  if (!node || typeof node !== 'object') return null;

  switch (node.type) {
    case 'text':
      return renderText(node, key);

    case 'hardBreak':
      return <br key={key} />;

    case 'paragraph':
      return (
        <p key={key} className="mb-4 last:mb-0">
          {renderNodes(node.content)}
        </p>
      );

    case 'heading': {
      const level = Math.min(Math.max(Number(node.attrs?.level) || 3, 3), 4);
      const Tag = `h${level}`;
      return (
        <Tag
          key={key}
          className="font-heading font-bold text-gray-900 mt-8 mb-3 text-2xl first:mt-0"
        >
          {renderNodes(node.content)}
        </Tag>
      );
    }

    case 'bulletList':
      return (
        <ul key={key} className="list-disc pl-6 mb-4 space-y-2 marker:text-brand-red">
          {renderNodes(node.content)}
        </ul>
      );

    case 'orderedList':
      return (
        <ol
          key={key}
          start={Number(node.attrs?.start) || 1}
          className="list-decimal pl-6 mb-4 space-y-2 marker:text-brand-red marker:font-bold"
        >
          {renderNodes(node.content)}
        </ol>
      );

    case 'listItem':
      return (
        // Nested paragraphs inside a list item shouldn't add vertical gaps.
        <li key={key} className="[&>p]:mb-0">
          {renderNodes(node.content)}
        </li>
      );

    case 'blockquote':
      return (
        <blockquote
          key={key}
          className="border-l-4 border-brand-red pl-5 italic text-gray-700 mb-4"
        >
          {renderNodes(node.content)}
        </blockquote>
      );

    default:
      // Unknown node — render its children if it has any, else skip it.
      return Array.isArray(node.content) ? (
        <div key={key}>{renderNodes(node.content)}</div>
      ) : null;
  }
}

export default function RichText({ value, className = '', fallback = null }) {
  // Legacy plain-text values (saved before the editor existed, and the
  // built-in fallback content) keep their original line-break rendering.
  if (typeof value === 'string') {
    return value.trim() === '' ? (
      fallback
    ) : (
      <div className={`whitespace-pre-line ${className}`}>{value}</div>
    );
  }

  if (!isRichDoc(value)) return fallback;

  return <div className={className}>{renderNodes(value.content)}</div>;
}
