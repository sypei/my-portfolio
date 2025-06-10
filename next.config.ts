import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  
  
};

export default nextConfig;