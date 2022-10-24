const withTM = require('next-transpile-modules')(['ui', 'icons', 'hooks'])

/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: 'https://docs-dapp-t.vercel.app',
      },
    ]
  },
}

module.exports = withTM(nextConfig)
