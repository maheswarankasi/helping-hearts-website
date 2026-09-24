import Image from 'next/image';

// Must stay in sync with `images.remotePatterns` in next.config.mjs.
const OPTIMISABLE_HOSTS = new Set([
  'res.cloudinary.com',
  'images.unsplash.com',
]);

function canOptimise(src) {
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
 * <img> for everything else.
 *
 * Shelter and event photos come from Firestore, so their host is whatever the
 * admin uploaded through. next/image throws a hard runtime error on an
 * unconfigured host, which would blank the whole page — this keeps a stray
 * URL to a broken image instead of a broken route.
 *
 * Pass either `fill` (parent must be positioned) or `width`/`height`.
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
  if (!src) return null;

  if (!canOptimise(src)) {
    return (
      // Deliberately a raw <img>: this is the fallback for hosts the image
      // optimiser is not configured for, where next/image would throw.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={fill ? `absolute inset-0 w-full h-full ${className}` : className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true } : { width, height })}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}
