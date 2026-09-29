/** @type {import('next').NextConfig} */
const lifecycleEvent = process.env.npm_lifecycle_event || "";
const isDevCommand = lifecycleEvent === "dev";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  distDir: isDevCommand ? ".next-dev" : ".next",

  // Keep dev runtime on normal Next server to avoid static asset 404s.
  // Build/export path stays static for Cloudflare Pages.
  output: isDevCommand ? undefined : "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Ensure CSS is properly bundled for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // `next dev` ignores public/_headers, so mirror the CORS rule for the KSH
  // JSON contract locally (ksef-ai on :8080 fetches it). Static export does
  // not support headers(), hence dev-only.
  ...(isDevCommand
    ? {
        async headers() {
          return [
            {
              source: "/poradnik/ksh/data/:path*",
              headers: [
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET" },
              ],
            },
          ];
        },
      }
    : {}),
};

module.exports = nextConfig;
