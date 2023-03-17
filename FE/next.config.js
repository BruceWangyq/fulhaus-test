/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
