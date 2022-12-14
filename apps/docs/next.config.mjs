import nextMDX from '@next/mdx'
import withTM from 'next-transpile-modules'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import { links } from './utils/links.mjs'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkMdxCodeMeta],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { links },
  pageExtensions: ['mdx', 'tsx'],
  basePath: '/docs',
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: true,
  experimental: {
    fallbackNodePolyfills: false,
  },
}

export default withTM(['ui', 'icons', 'hooks'])(withMDX(nextConfig))
