const withTM = require('next-transpile-modules')(['ui', 'icons', 'hooks'])

/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = withTM(nextConfig)
