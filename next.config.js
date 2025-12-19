/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Generate pure static output for Cloudflare Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,

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
