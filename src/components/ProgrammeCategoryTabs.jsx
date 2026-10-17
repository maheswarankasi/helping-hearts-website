"use client";

import Link from 'next/link';
import { PROGRAMME_CATEGORIES } from '@/lib/shelterCategories';

/**
 * Clean, accessible category switcher tabs for the three shelter programmes:
 * - Long-Term Shelters
 * - Mid-Term Shelters
 * - Livelihood Shelters
 *
 * @param {object} props
 * @param {'long-term' | 'mid-term' | 'livelihood'} props.activeCategory
 * @param {Record<string, number>} [props.shelterCounts] Optional map of category counts
 */
export default function ProgrammeCategoryTabs({ activeCategory, shelterCounts = {} }) {
  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-4xl mx-auto p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200">
        {PROGRAMME_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = shelterCounts[cat.id];

          return (
            <Link
              key={cat.id}
              href={`/programs/${cat.id}`}
              className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm md:text-base font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-brand-blue shadow-md border border-gray-200/80 scale-[1.01]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <i
                className={`${cat.icon} text-base ${
                  isActive
                    ? cat.tone === 'red'
                      ? 'text-brand-red'
                      : cat.tone === 'emerald'
                      ? 'text-emerald-600'
                      : 'text-brand-blue'
                    : 'text-gray-400'
                }`}
              ></i>
              <span>{cat.title}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-brand-softblue text-brand-blue'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
