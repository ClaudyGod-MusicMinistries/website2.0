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
    // Reuse optimized derivatives at the edge instead of repeatedly asking
    // the origin to transform an unchanged content asset.
    minimumCacheTTL: 86400,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
