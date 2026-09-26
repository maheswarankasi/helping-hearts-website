/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactCompiler: true,

  images: {
    // Next 16 changed the default from "any quality" to [75] only, and a
    // request for a quality outside this list is rejected with HTTP 400.
    // 60 is used for the large hero/banner backgrounds, where the extra
    // compression is invisible but saves a lot of bytes.
    qualities: [60, 75],

    // Hosts the image optimiser is allowed to fetch from. Keep this list
    // tight: every entry is a URL our own server will fetch on request.
    remotePatterns: [
      // Demo imagery in siteContent.js
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Note: res.cloudinary.com and img.youtube.com are deliberately NOT
      // listed. Cloudinary resizes at its own CDN edge and YouTube poster
      // frames are fetched straight by the browser, both via SmartImage —
      // so neither needs to be proxied through this server.
    ],
  },
};

export default nextConfig;
