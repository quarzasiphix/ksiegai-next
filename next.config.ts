import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Required for Cloudflare Pages static export
  output: "export",

  // Required if you use next/image anywhere
  images: { unoptimized: true },

  // Optional but recommended for clean deploys
  trailingSlash: false,
};

export default nextConfig;
