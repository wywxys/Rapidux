import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of auth routes in production
  async rewrites() {
    return [];
  },
  
  // Optimize for production builds
  experimental: {
    optimizePackageImports: ['next-auth'],
  },
  
  // Environment variable handling
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
