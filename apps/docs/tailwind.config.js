const baseConfig = require('ui/tailwind.config')

/** @type {import('tailwindcss`.Config} */
module.exports = {
  ...baseConfig,
  content: ['**/*.tsx', '../../packages/ui/**/*.tsx'],
  safelist: ['max-h-48'],
}
