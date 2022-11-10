/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `cdn.iwantalipstick.com`,
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
