const baseConfig = require('ui/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['**/*.tsx', '../../packages/ui/**/*.tsx'],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
}
