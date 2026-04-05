import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.kyobobook.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
