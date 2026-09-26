"use client";

import { useEffect } from 'react';

/**
 * Confirmation prompt for destructive admin actions.
 *
 * Deliberately not `window.confirm`: it can't show the record name clearly,
 * can't be styled to signal how permanent this is, and is blocked outright in
 * some embedded browsers.
 */
export default function ConfirmDialog({
  title = 'Are you sure?',
  message,
  itemName,
  confirmLabel = 'Delete',
  isBusy = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !isBusy) onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel, isBusy]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>
          <div className="min-w-0">
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
            disabled={isBusy}
            className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isBusy}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-70"
          >
            {isBusy ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i> Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
