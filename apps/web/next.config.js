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
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/docs/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/docs/:path*'
            : 'https://docs-dapp-t.vercel.app/docs/:path*',
      },
    ]
  },
}

module.exports = withTM(nextConfig)
