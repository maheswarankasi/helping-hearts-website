"use client";

import { useState, useRef, useEffect } from 'react';

export const STATUS_OPTIONS = [
  {
    value: 'awaiting confirmation',
    label: 'Awaiting Confirmation',
    shortLabel: 'Awaiting',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200/70',
    optionActiveClass: 'bg-amber-50 text-amber-900 border-l-4 border-amber-500 font-semibold',
    dotBg: 'bg-amber-500',
    pingBg: 'bg-amber-400',
    icon: 'fa-regular fa-clock',
  },
  {
    value: 'confirmed',
    label: 'Confirmed',
    shortLabel: 'Confirmed',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200/70',
    optionActiveClass: 'bg-blue-50 text-blue-900 border-l-4 border-blue-600 font-semibold',
    dotBg: 'bg-blue-600',
    pingBg: 'bg-blue-400',
    icon: 'fa-solid fa-circle-check',
  },
  {
    value: 'receipted',
    label: 'Receipted',
    shortLabel: 'Receipted',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200/70',
    optionActiveClass: 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-600 font-semibold',
    dotBg: 'bg-emerald-600',
    pingBg: 'bg-emerald-400',
    icon: 'fa-solid fa-receipt',
  },
];

export default function DonorStatusDropdown({
  status = 'awaiting confirmation',
  onChange,
  disabled = false,
  dropUp = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDropUp, setIsDropUp] = useState(dropUp);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Normalize status string
  const currentKey = String(status || '').toLowerCase().trim();
  const activeOption =
    STATUS_OPTIONS.find((opt) => opt.value === currentKey) || STATUS_OPTIONS[0];

  const handleToggle = (e) => {
    e.stopPropagation();
    if (disabled || isUpdating) return;

    if (!isOpen) {
      let shouldDropUp = dropUp;
      if (!shouldDropUp && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        shouldDropUp = spaceBelow < 190;
      }
      setIsDropUp(shouldDropUp);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = async (newValue, e) => {
    e.stopPropagation();
    if (newValue === activeOption.value) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    setIsUpdating(true);

    try {
      if (onChange) {
        await onChange(newValue);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Badge Button Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled || isUpdating}
        onClick={handleToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-xs transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${activeOption.badgeClass}`}
        title={`Status: ${activeOption.label}. Click to change.`}
      >
        {isUpdating ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-[11px] text-current"></i>
            <span>Updating…</span>
          </>
        ) : (
          <>
            {/* Animated Indicator */}
            <span className="relative flex h-2 w-2 items-center justify-center">
              {activeOption.value === 'awaiting confirmation' && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeOption.pingBg}`}
                ></span>
              )}
              {activeOption.value === 'confirmed' && (
                <span
                  className={`animate-pulse absolute inline-flex h-full w-full rounded-full opacity-50 ${activeOption.pingBg}`}
                ></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${activeOption.dotBg}`}
              ></span>
            </span>

            <span>{activeOption.label}</span>

            <i
              className={`fa-solid fa-chevron-down text-[10px] ml-0.5 opacity-70 transition-transform duration-200 ${
                isOpen ? (isDropUp ? '-rotate-180' : 'rotate-180') : ''
              }`}
            ></i>
          </>
        )}
      </button>

      {/* Floating Dropdown Menu (supports dynamic drop-up to eliminate scroll jumping) */}
      {isOpen && (
        <div
          className={`absolute right-0 sm:left-0 z-50 w-64 rounded-xl bg-white shadow-xl ring-1 ring-black/10 py-1.5 text-xs focus:outline-hidden animate-in fade-in zoom-in-95 duration-100 ${
            isDropUp
              ? 'bottom-full mb-1.5 origin-bottom-left'
              : 'top-full mt-1.5 origin-top-left'
          }`}
        >
          <div className="py-1">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = opt.value === activeOption.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={(e) => handleSelect(opt.value, e)}
                  className={`w-full text-left px-3 py-2.5 transition flex items-start gap-2.5 hover:bg-gray-50 cursor-pointer ${
                    isSelected ? opt.optionActiveClass : 'text-gray-700'
                  }`}
                >
                  <span className="mt-0.5 text-sm">
                    <i className={`${opt.icon} ${isSelected ? opt.dotBg.replace('bg-', 'text-') : 'text-gray-400'}`}></i>
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <i className="fa-solid fa-check text-blue-600 text-xs ml-1"></i>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
