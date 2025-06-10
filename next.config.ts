import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   // Build configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: "build",
};
// module.exports = nextConfig;


export default nextConfig;
