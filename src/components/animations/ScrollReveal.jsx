"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component:
 * Guarantees content is ALWAYS visible (never hidden by opacity-0)
 * while triggering smooth on-scroll entrance animations as the user scrolls down.
 */
export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.55,
  priority = false,
  className = "",
  style = {},
  ...rest
}) {
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            setHasScrolledIn(true);
            if (observer) observer.disconnect();
          }
        },
        {
          rootMargin: "60px 0px -20px 0px",
          threshold: 0.02,
        }
      );
      observer.observe(el);
    } catch {
      setTimeout(() => setHasScrolledIn(true), 0);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${hasScrolledIn ? 'animate-fade-in-up' : ''} ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
