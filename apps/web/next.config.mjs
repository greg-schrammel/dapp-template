import withTM from 'next-transpile-modules'
import { env } from './env/server.mjs'

const docsUrl =
  env.NODE_ENV === 'development'
    ? 'http://localhost:3001/docs'
    : 'https://docs-dapp-t.vercel.app/docs'

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
      { source: '/:path*', destination: `/:path*` },
      { source: '/docs', destination: `${docsUrl}` },
      { source: '/docs/:path*', destination: `${docsUrl}/:path*` },
    ]
  },
}

export default withTM(['ui', 'icons', 'hooks'])(nextConfig)
