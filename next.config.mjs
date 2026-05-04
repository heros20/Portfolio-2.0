/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

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
  output: 'export',

  // === GITHUB PAGES compatibility ===
  basePath: isProd ? '/Portfolio-2.0' : '',
  assetPrefix: isProd ? '/Portfolio-2.0/' : '',
  trailingSlash: true,

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/Portfolio-2.0' : '',
  },
};

export default nextConfig;
