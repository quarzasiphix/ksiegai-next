/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Generate pure static output for Cloudflare Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // Changed to true for static hosting

  // Ensure CSS is properly bundled for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "https://app.ksiegai.pl/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
