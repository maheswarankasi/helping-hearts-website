/**
 * Rich text is stored as a Tiptap/ProseMirror JSON document, not as an HTML
 * string.
 *
 * That is a deliberate security decision. The admin panel has no sign-in and
 * the Firestore write rules are open, so anyone who learns the project id can
 * write to these fields. If we stored HTML we would have to render it with
 * `dangerouslySetInnerHTML`, and an injected `<script>` or `<img onerror>`
 * would run in every visitor's browser. Storing a node tree and rendering it
 * through React (see components/RichText.jsx) makes that impossible — the
 * renderer only ever emits elements it knows about.
 *
 * Plain strings are still valid input everywhere: existing documents were
 * saved before the editor existed, and the fallback content is plain text.
 */

export const EMPTY_DOC = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

/** True when `value` looks like a ProseMirror document. */
export function isRichDoc(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value.type === 'doc' &&
      Array.isArray(value.content)
  );
}

/**
 * Only http(s), mailto and tel links are allowed through. Anything else —
 * `javascript:`, `data:`, `vbscript:` — is dropped, so a crafted link cannot
 * become script execution.
 */
export function safeHref(href) {
  if (typeof href !== 'string') return null;

  const trimmed = href.trim();
  if (trimmed === '') return null;

  // Protocol-relative and root-relative links are fine.
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;

  const allowed = ['http:', 'https:', 'mailto:', 'tel:'];
  try {
    const url = new URL(trimmed);
    return allowed.includes(url.protocol) ? trimmed : null;
  } catch {
    // No protocol at all, e.g. "helpinghearts.org" — assume https.
    return /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)
      ? `https://${trimmed}`
      : null;
  }
}

/**
 * Flattens rich text to a single plain string.
 *
 * Used wherever formatting would be wrong or impossible: card excerpts under
 * a line-clamp, `<meta name="description">`, and admin table cells.
 */
export function toPlainText(value) {
  if (typeof value === 'string') return value;
  if (!isRichDoc(value)) return '';

  const parts = [];

  const walk = (node) => {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'text' && typeof node.text === 'string') {
      parts.push(node.text);
      return;
    }

    if (node.type === 'hardBreak') {
      parts.push(' ');
      return;
    }

    if (Array.isArray(node.content)) node.content.forEach(walk);

    // Block-level nodes get a separator so words don't run together.
    if (['paragraph', 'listItem', 'heading', 'blockquote'].includes(node.type)) {
      parts.push('\n');
    }
  };

  value.content.forEach(walk);

  return parts.join('').replace(/\n{2,}/g, '\n').trim();
}

/** True when the value carries no readable text. */
export function isRichEmpty(value) {
  return toPlainText(value).trim() === '';
}

/** Wraps legacy plain text into a document so the editor can open it. */
export function fromPlainText(text) {
  if (typeof text !== 'string' || text.trim() === '') return EMPTY_DOC;

  return {
    type: 'doc',
    content: text.split(/\n{2,}/).map((paragraph) => ({
      type: 'paragraph',
      content: paragraph
        .split('\n')
        .flatMap((line, index) =>
          index === 0
            ? [{ type: 'text', text: line }]
            : [{ type: 'hardBreak' }, { type: 'text', text: line }]
        )
        // A trailing hardBreak with no text would be invalid.
        .filter((node) => node.type !== 'text' || node.text !== ''),
    })),
  };
}

/**
 * Normalises whatever came out of the editor into something safe to hand to
 * Firestore: a document, or null when it is effectively blank.
 */
export function toStoredValue(value) {
  if (typeof value === 'string') {
    return value.trim() === '' ? null : value.trim();
  }
  if (!isRichDoc(value)) return null;
  return isRichEmpty(value) ? null : value;
}
