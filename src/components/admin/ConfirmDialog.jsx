"use client";

import { useEffect } from 'react';

/**
 * Confirmation prompt for destructive admin actions.
 * Supports both conditional mounting and the `isOpen` prop.
 */
export default function ConfirmDialog({
  isOpen = true,
  title = 'Are you sure?',
  message,
  itemName,
  confirmLabel = 'Delete',
  confirmText, // alias for confirmLabel
  isBusy = false,
  isLoading = false, // alias for isBusy
  onConfirm,
  onCancel,
}) {
  const busy = isBusy || isLoading;
  const label = confirmText || confirmLabel;

  useEffect(() => {
    if (isOpen === false) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !busy && onCancel) {
        onCancel();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel, busy, isOpen]);

  // If explicitly closed via prop, do not render into DOM
  if (isOpen === false) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>
          <div className="min-w-0 flex-1">
            <h3 id="confirm-title" className="text-xl font-bold text-gray-900">
              {title}
            </h3>
            {itemName && (
              <p className="mt-1 font-semibold text-gray-800 break-words">
                “{itemName}”
              </p>
            )}
            {message && (
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-70 transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {busy ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-1"></i> Deleting...
              </>
            ) : (
              label
            )}
          </button>
        </div>
      </div>
    </div>
  );
}