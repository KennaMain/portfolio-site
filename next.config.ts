import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // assetPrefix: isProd ? '/portfolio-site/' : '',
  output: 'export', // For static export
  // images: {
  //   unoptimized: true, // For static export
  // },
  // Ensure JavaScript isn't being disabled
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
