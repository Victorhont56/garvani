/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com"
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/listings/:path*",
        destination: "/listings/[listingId]",
      },
    ];
  },
};

module.exports = nextConfig;
