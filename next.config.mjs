/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactCompiler: true,

  // Hosts the image optimiser is allowed to fetch from. Keep this list tight:
  // every entry here is a URL our server will fetch on request. Anything not
  // listed still renders, via the plain <img> fallback in SmartImage.
  images: {
    remotePatterns: [
      // Admin uploads
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Demo imagery in siteContent.js
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Note: img.youtube.com is deliberately NOT listed. Its poster frames
      // are fetched straight by the browser via SmartImage's <img> fallback,
      // which avoids proxying them through our own server.
    ],
  },
};

export default nextConfig;
