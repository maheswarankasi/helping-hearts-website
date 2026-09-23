const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

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
