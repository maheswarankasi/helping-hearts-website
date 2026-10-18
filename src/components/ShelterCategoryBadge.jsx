import React from 'react';

/**
 * Category Mapping Dictionary:
 * Map the backend category key to the corresponding human-readable label:
 * - mid-term (or medium-term) -> "Medium Term Rehabilitation Pathway"
 * - long-term -> "Long Term Residential & Dignified Care"
 * - livelihood -> "Livelihood Development and Social Reintegration"
 */
export const CATEGORY_LABELS = {
  'mid-term': 'Medium Term Rehabilitation Pathway',
  'medium-term': 'Medium Term Rehabilitation Pathway',
  'long-term': 'Long Term Residential & Dignified Care',
  'livelihood': 'Livelihood Development and Social Reintegration',
};

export const CATEGORY_ACCENTS = {
  'mid-term': {
    dot: 'bg-amber-400',
  },
  'medium-term': {
    dot: 'bg-amber-400',
  },
  'long-term': {
    dot: 'bg-sky-400',
  },
  'livelihood': {
    dot: 'bg-emerald-400',
  },
};

/**
 * Returns mapped category information with safe fallback
 * @param {string} [category]
 * @returns {{ label: string, dot: string }}
 */
export function getCategoryBadgeData(category) {
  if (!category || typeof category !== 'string') {
    return {
      label: 'Long Term Residential & Dignified Care',
      dot: 'bg-sky-400',
    };
  }

  const normalizedKey = category.toLowerCase().trim();
  const label = CATEGORY_LABELS[normalizedKey] || 'Long Term Residential & Dignified Care';
  const dot = CATEGORY_ACCENTS[normalizedKey]?.dot || 'bg-sky-400';

  return { label, dot };
}

/**
 * Floating category badge overlay positioned directly on top of shelter card image.
 *
 * @param {object} props
 * @param {string} [props.category] - Backend category key ('mid-term', 'long-term', 'livelihood', etc.)
 * @param {string} [props.className] - Optional extra Tailwind classes
 */
export default function ShelterCategoryBadge({ category, className = '' }) {
  const { label, dot } = getCategoryBadgeData(category);

  return (
    <span
      className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-black/65 text-white backdrop-blur-md shadow-sm border border-white/15 max-w-[calc(100%-1.5rem)] pointer-events-none select-none ${className}`}
      title={label}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}
