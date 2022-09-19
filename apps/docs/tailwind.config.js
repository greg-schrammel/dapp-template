const baseConfig = require('ui/tailwind.config')

const rgba = (cssVar) => `rgb(var(--${cssVar}) / <alpha-value>)`

/** @type {import('tailwindcss`.Config} */
module.exports = {
  ...baseConfig,
  content: ['**/*.tsx', '../../packages/ui/**/*.tsx'],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      backgroundColor: {
        primary: rgba`bg-primary`,
        secondary: rgba`bg-secondary`,
      },
      textColor: {
        high: rgba`text-high`,
        medium: rgba`text-medium`,
        low: rgba`text-low`,
      },
      borderColor: {
        high: rgba`text-low`,
        DEFAULT: rgba`bg-secondary`,
      },
    },
  },
}
