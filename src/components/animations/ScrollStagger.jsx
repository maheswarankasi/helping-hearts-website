"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const StaggerContext = createContext({ hasScrolledIn: false, stagger: 0.1 });

/**
 * ScrollStagger container:
 * Keeps all child items visible by default (no opacity-0 blocking)
 * and triggers staggered entrance animations as the container is scrolled into view.
 */
export function ScrollStagger({
  children,
  stagger = 0.1,
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
    <StaggerContext.Provider value={{ hasScrolledIn, stagger }}>
      <div ref={ref} className={className} style={style} {...rest}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

/**
 * Child item inside ScrollStagger:
 * Visible by default; smoothly animates in when scrolled into view.
 */
export function ScrollStaggerItem({
  children,
  className = "",
  style = {},
  index = 0,
  ...rest
}) {
  const { hasScrolledIn, stagger } = useContext(StaggerContext);

  return (
    <div
      className={`${hasScrolledIn ? 'animate-fade-in-up' : ''} ${className}`}
      style={{
        animationDuration: '0.5s',
        animationDelay: hasScrolledIn ? `${(index || 0) * stagger}s` : '0s',
        animationFillMode: 'both',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
