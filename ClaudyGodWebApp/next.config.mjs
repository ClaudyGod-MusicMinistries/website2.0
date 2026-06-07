/** @type {import('next).NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.youtube.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
