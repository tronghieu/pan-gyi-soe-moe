import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ["@keystatic/core"],
  },
  images: {
    // Enable remote pattern for images if needed
    // This is important if you'll be using external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google image hosting for the templates
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
