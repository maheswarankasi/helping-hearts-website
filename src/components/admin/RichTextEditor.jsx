"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RichText from '@/components/RichText';
import { fromPlainText, isRichDoc, safeHref } from '@/lib/richText';

/**
 * Small WYSIWYG editor for the admin forms. Emits a ProseMirror JSON document
 * via `onChange` — never an HTML string. See lib/richText.js for why.
 *
 * `mode="inline"` drops the block-level buttons. Use it for the card summary,
 * which the public site renders inside a three-line clamp where a bullet list
 * would break the layout.
 */

function ToolbarButton({ onClick, isActive, disabled, title, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={Boolean(isActive)}
      className={`h-8 min-w-8 px-2 rounded-md text-sm flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {icon ? <i className={icon}></i> : label}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-gray-300 mx-1" aria-hidden="true" />;
}

export default function RichTextEditor({
  value,
  onChange,
  mode = 'full',
  placeholder = '',
  minHeight = '10rem',
  id,
}) {
  const isInline = mode === 'inline';
  const [isPreviewing, setIsPreviewing] = useState(false);

  // The serialised form of the last document we handed to the parent. Used to
  // recognise our own value coming back so we don't re-seed the editor —
  // setContent() would move the caret to the end mid-typing.
  const lastEmitted = useRef(null);

  const editor = useEditor({
    // Rendering the editor on the server would mismatch on hydration.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Keep the output small and predictable: only the marks and blocks
        // the public renderer knows how to style.
        heading: false,
        codeBlock: false,
        horizontalRule: false,
        blockquote: isInline ? false : undefined,
        bulletList: isInline ? false : undefined,
        orderedList: isInline ? false : undefined,
        listItem: isInline ? false : undefined,
        link: {
          openOnClick: false,
          autolink: true,
          // Tiptap's own href allowlist, mirroring lib/richText.safeHref.
          protocols: ['http', 'https', 'mailto', 'tel'],
        },
      }),
    ],
    content: isRichDoc(value) ? value : fromPlainText(value ?? ''),
    editorProps: {
      attributes: {
        class: 'prose-admin focus:outline-none',
        style: `min-height:${minHeight}`,
        ...(id ? { id } : {}),
      },
    },
    onUpdate: ({ editor: instance }) => {
      const doc = instance.getJSON();
      lastEmitted.current = JSON.stringify(doc);
      onChange?.(doc);
    },
  });

  const serialisedValue = JSON.stringify(
    isRichDoc(value) ? value : fromPlainText(value ?? '')
  );

  // Re-seed the editor only on a genuinely external change — a form reset,
  // or loading an existing record. Echoes of our own onUpdate are ignored.
  useEffect(() => {
    if (!editor) return;
    if (serialisedValue === lastEmitted.current) return;

    lastEmitted.current = serialisedValue;
    editor.commands.setContent(JSON.parse(serialisedValue), {
      emitUpdate: false,
    });
  }, [editor, serialisedValue]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const existing = editor.getAttributes('link')?.href ?? '';
    const input = window.prompt(
      'Link URL (http://, https://, mailto: or tel:)',
      existing
    );

    // Cancelled — leave the selection alone.
    if (input === null) return;

    if (input.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const href = safeHref(input);
    if (!href) {
      window.alert(
        'That link was not added. Please use an http://, https://, mailto: or tel: address.'
      );
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div
        className="w-full border rounded-lg bg-gray-50 animate-pulse"
        style={{ minHeight }}
      />
    );
  }

  const isEmpty = editor.isEmpty;

  return (
    <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400 transition">
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 bg-gray-50 border-b">
        <ToolbarButton
          title="Bold (Ctrl+B)"
          icon="fa-solid fa-bold"
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          title="Italic (Ctrl+I)"
          icon="fa-solid fa-italic"
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          title="Underline (Ctrl+U)"
          icon="fa-solid fa-underline"
          isActive={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        {!isInline && (
          <>
            <Divider />
            <ToolbarButton
              title="Bulleted list"
              icon="fa-solid fa-list-ul"
              isActive={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
              title="Numbered list"
              icon="fa-solid fa-list-ol"
              isActive={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <ToolbarButton
              title="Quote"
              icon="fa-solid fa-quote-left"
              isActive={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
          </>
        )}

        <Divider />
        <ToolbarButton
          title="Add or edit link"
          icon="fa-solid fa-link"
          isActive={editor.isActive('link')}
          onClick={setLink}
        />
        <ToolbarButton
          title="Remove link"
          icon="fa-solid fa-link-slash"
          disabled={!editor.isActive('link')}
          onClick={() => editor.chain().focus().unsetLink().run()}
        />

        <Divider />
        <ToolbarButton
          title="Clear formatting"
          icon="fa-solid fa-text-slash"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        />

        <span className="ml-auto flex items-center gap-0.5">
          <ToolbarButton
            title="Undo (Ctrl+Z)"
            icon="fa-solid fa-rotate-left"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            title="Redo (Ctrl+Shift+Z)"
            icon="fa-solid fa-rotate-right"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />
          <Divider />
          {/* Renders through the same component the public pages use, so what
              you see here is exactly what a visitor will get. */}
          <ToolbarButton
            title={isPreviewing ? 'Back to editing' : 'Preview as visitors see it'}
            icon={isPreviewing ? 'fa-solid fa-pen' : 'fa-solid fa-eye'}
            isActive={isPreviewing}
            onClick={() => setIsPreviewing((on) => !on)}
          />
        </span>
      </div>

      {isPreviewing ? (
        <div className="bg-brand-cream/60 px-3 py-3" style={{ minHeight }}>
          <RichText
            value={editor.getJSON()}
            className="text-gray-600 leading-relaxed"
            fallback={
              <p className="text-gray-400 italic">Nothing to preview yet.</p>
            }
          />
        </div>
      ) : (
        <div className="relative bg-white">
          {isEmpty && placeholder && (
            <p className="absolute top-3 left-3 text-gray-400 pointer-events-none select-none">
              {placeholder}
            </p>
          )}
          <EditorContent editor={editor} className="px-3 py-3" />
        </div>
      )}
    </div>
  );
}
