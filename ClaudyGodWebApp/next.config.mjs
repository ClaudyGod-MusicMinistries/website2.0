/** @type {import('next).NextConfig} */
const nextConfig = {
  // Pre-push verification uses an isolated output directory so it can run
  // safely while a developer has `next dev` open against the normal `.next`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.youtube.com' },
      { protocol: 'https', hostname: '**.ytimg.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
