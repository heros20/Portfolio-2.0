/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // === STATIC EXPORT MODE ===
  //output: 'export',
  // === GITHUB PAGES compatibility ===
  //basePath: '/Portfolio-2.0',
  //assetPrefix: '/Portfolio-2.0/',
};

export default nextConfig;
