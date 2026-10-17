"use client";

import { useEffect, useState } from 'react';

/**
 * Top scroll progress bar tracking user scroll position across all public pages.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{ transform: `scaleX(${progress})` }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-brand-red origin-left z-50 pointer-events-none transition-transform duration-75 ease-out"
    />
  );
}
