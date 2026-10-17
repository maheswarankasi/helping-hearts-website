"use client";

import { useEffect, useRef } from 'react';

/**
 * Invisible sentinel element that automatically triggers `onLoadMore`
 * when scrolled near the viewport bottom.
 *
 * @param {object} props
 * @param {boolean} props.hasMore Whether more items are available
 * @param {boolean} props.loading Whether a load is currently in flight
 * @param {() => void} props.onLoadMore Callback to load the next batch
 * @param {string} [props.loadingText='Loading more...']
 * @param {string} [props.className='']
 */
export default function InfiniteScrollTrigger({
  hasMore,
  loading = false,
  onLoadMore,
  loadingText = 'Loading more contents as you scroll...',
  className = '',
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: '250px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);

  if (!hasMore && !loading) return null;

  return (
    <div ref={triggerRef} className={`w-full py-8 text-center ${className}`}>
      {loading && (
        <div className="inline-flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue/80">
            {loadingText}
          </p>
        </div>
      )}
    </div>
  );
}
