'use client';

import { useState } from 'react';
import Image from 'next/image';

// Must stay in sync with `images.remotePatterns` in next.config.mjs.
const OPTIMISABLE_HOSTS = new Set([
  'res.cloudinary.com',
  'images.unsplash.com',
]);

const FALLBACK_IMAGE = '/helping-hearts.jpeg';

function canOptimise(src) {
  if (!src) return false;
  // Anything served from /public is local and always fine.
  if (src.startsWith('/')) return true;

  try {
    return OPTIMISABLE_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

/**
 * next/image for hosts the optimiser is configured for, and a plain lazy
 * <img> for everything else. Includes fallback for 404 / broken remote URLs.
 */
export default function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality,
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (!imgSrc) return null;

  const handleError = () => {
    if (!hasError && imgSrc !== FALLBACK_IMAGE) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  if (!canOptimise(imgSrc)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt || ''}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={handleError}
        className={fill ? `absolute inset-0 w-full h-full ${className}` : className}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || ''}
      {...(fill ? { fill: true } : { width, height })}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
}
