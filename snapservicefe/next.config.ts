import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // chấp nhận mọi domain
      },
    ],
  },
};

export default nextConfig;
