const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: 'https://app.ksiegai.pl/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
