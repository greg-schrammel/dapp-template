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
        source: '/docs/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'localhost:3001/:path*'
            : 'https://docs-dapp-t.vercel.app/:path*',
      },
    ]
  },
}

module.exports = withTM(nextConfig)
