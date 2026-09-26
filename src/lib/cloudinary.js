const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export function isCloudinaryUrl(src) {
  return typeof src === 'string' && src.includes('res.cloudinary.com/');
}

/**
 * Rewrites a Cloudinary delivery URL to let Cloudinary itself resize and
 * compress the image at its own CDN edge.
 *
 * We deliberately do NOT put these through Next's image optimiser. Cloudinary
 * is already an image CDN, so proxying through our own server would spend our
 * CPU and bandwidth re-optimising an image that is optimised already, and the
 * browser would wait on an extra hop. Going direct is faster and keeps
 * uploaded photos working even when the Next server itself cannot reach
 * Cloudinary over TLS.
 *
 *   .../image/upload/v123/folder/file.jpg
 *   .../image/upload/f_auto,q_auto,w_800/v123/folder/file.jpg
 *
 * `f_auto` picks WebP/AVIF per browser, `q_auto` picks a sane quality.
 */
export function cloudinaryUrl(src, { width, quality } = {}) {
  if (!isCloudinaryUrl(src)) return src;

  const marker = '/upload/';
  const at = src.indexOf(marker);
  if (at === -1) return src;

  const transforms = ['f_auto', quality ? `q_${quality}` : 'q_auto'];
  if (width) transforms.push(`w_${Math.round(width)}`, 'c_limit');

  const head = src.slice(0, at + marker.length);
  let tail = src.slice(at + marker.length);

  // Don't stack transformations if this URL already carries some.
  if (/^[a-z]{1,3}_[^/]+\//.test(tail)) {
    tail = tail.slice(tail.indexOf('/') + 1);
  }

  return `${head}${transforms.join(',')}/${tail}`;
}

/** Widths offered in the srcset for Cloudinary-hosted images. */
const SRCSET_WIDTHS = [400, 640, 800, 1200, 1600, 1920];

export function cloudinarySrcSet(src, { quality } = {}) {
  if (!isCloudinaryUrl(src)) return undefined;

  return SRCSET_WIDTHS.map(
    (width) => `${cloudinaryUrl(src, { width, quality })} ${width}w`
  ).join(', ');
}

/**
 * Uploads files to Cloudinary one at a time and returns their secure URLs.
 *
 * @param {File[]} files
 * @param {string} folder Cloudinary folder, e.g. `HelpingHearts/Events/Diwali`
 * @param {(done: number, total: number) => void} [onProgress]
 */
export async function uploadImages(files, folder, onProgress) {
  if (files.length === 0) return [];

  if (!isCloudinaryConfigured) {
    throw new Error(
      'Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local.'
    );
  }

  const urls = [];

  for (const file of files) {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', UPLOAD_PRESET);
    body.append('folder', folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body }
    );

    if (!res.ok) {
      let detail = '';
      try {
        const errorBody = await res.json();
        detail = errorBody?.error?.message ? ` (${errorBody.error.message})` : '';
      } catch {
        // Non-JSON error body — the status code alone will have to do.
      }
      throw new Error(`Upload failed for ${file.name}${detail}`);
    }

    const result = await res.json();
    urls.push(result.secure_url);
    onProgress?.(urls.length, files.length);
  }

  return urls;
}

/** Turns a title into a safe Cloudinary folder segment. */
export function toFolderName(title) {
  return (
    title
      .trim()
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .slice(0, 60) || 'Untitled'
  );
}
