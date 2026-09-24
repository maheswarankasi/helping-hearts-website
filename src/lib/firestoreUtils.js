// Shared helpers for turning raw Firestore documents into the shapes the
// public components expect.

/**
 * Firestore may hand us a Timestamp, a JS Date, or an ISO/`YYYY-MM-DD` string
 * depending on how the document was written. Normalise all of them to a Date,
 * or null when the value is missing or unparseable.
 */
export function toDate(value) {
  if (!value) return null;

  if (typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

export function formatDateParts(date) {
  if (!date) return { day: null, month: null, label: null };

  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: date.toLocaleString('en-US', { month: 'short' }),
    label: date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };
}

/** Keeps only non-empty strings, so a half-filled `images` array stays safe. */
export function cleanImageList(images) {
  if (!Array.isArray(images)) return [];
  return images.filter((url) => typeof url === 'string' && url.trim() !== '');
}

/** Formats an amount as Indian rupees, e.g. 1500 -> "₹1,500". */
export function formatAmount(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return '—';
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Treats empty strings and whitespace as "not provided". */
export function optionalText(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}
