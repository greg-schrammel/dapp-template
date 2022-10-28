const baseConfig = require('ui/tailwind.config')

/** @type {import('tailwindcss`.Config} */
module.exports = {
  ...baseConfig,
  content: ['**/*.tsx', '../../packages/ui/**/*.tsx', '../../packages/ui/**/*.docs.mdx'],
  safelist: ['max-h-48', '-ml-1'],
}
