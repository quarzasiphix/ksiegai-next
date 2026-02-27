/** @type {import('next').NextConfig} */
const lifecycleEvent = process.env.npm_lifecycle_event || "";
const isDevCommand = lifecycleEvent === "dev";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Keep dev runtime on normal Next server to avoid static asset 404s.
  // Build/export path stays static for Cloudflare Pages.
  output: isDevCommand ? undefined : "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Ensure CSS is properly bundled for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
