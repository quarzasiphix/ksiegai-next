import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: 'https://app.ksiegai.pl/:path*', // Proxy to app subdomain
      },
    ];
  },
};

export default nextConfig;
