/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Suppress the punycode warning
    config.ignoreWarnings = [{ module: /node_modules\/punycode/ }];

    // Disable webpack caching
    config.cache = false;

    return config;
  },
  // Disable font optimization during build
  optimizeFonts: false,
  experimental: {
    // Disable webpack cache
    webpackBuildWorker: false,
  },
};

module.exports = nextConfig;
