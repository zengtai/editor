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
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
};

module.exports = nextConfig;
