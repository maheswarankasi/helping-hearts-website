import Image from 'next/image';
import {
  cloudinarySrcSet,
  cloudinaryUrl,
  isCloudinaryUrl,
} from '@/lib/cloudinary';

// Must stay in sync with `images.remotePatterns` in next.config.mjs.
// Cloudinary is intentionally absent — see below.
const OPTIMISABLE_HOSTS = new Set(['images.unsplash.com']);

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
 * Picks the right delivery strategy per image source.
 *
 *   /public files + Unsplash → next/image (our optimiser resizes them)
 *   Cloudinary               → straight to Cloudinary's CDN, which resizes
 *                              it for us via URL transformations
 *   anything else            → plain lazy <img>
 *
 * Admin uploads live on Cloudinary, and routing those through next/image was
 * actively breaking them: the optimiser fetches the source server-side, and
 * that fetch fails behind a TLS-inspecting proxy, returning HTTP 500 and a
 * blank image. Cloudinary already does resizing and format negotiation at its
 * edge, so going direct is both more reliable and one network hop shorter.
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

  if (isCloudinaryUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cloudinaryUrl(src, { width: width ?? 1200, quality })}
        srcSet={cloudinarySrcSet(src, { quality })}
        sizes={sizes ?? (fill ? '100vw' : undefined)}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={
          fill ? `absolute inset-0 w-full h-full ${className}` : className
        }
      />
    );
  }

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
        className={
          fill ? `absolute inset-0 w-full h-full ${className}` : className
        }
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
