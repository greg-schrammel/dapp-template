const withTM = require('next-transpile-modules')(['ui', 'icons', 'hooks'])

/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: true,
}

module.exports = withTM(nextConfig)
