const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('./styles/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"InterVariable"', ...defaultTheme.fontFamily.sans],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors,
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '14px',
      },
      backgroundColor: colors.background,
      textColor: colors.text,
      borderColor: {
        DEFAULT: colors.border.primary,
        primary: colors.border.primary,
        secondary: colors.border.secondary,
      },
      boxShadow: {
        DEFAULT: 'var(--shadow-primary)',
      },
      outlineColor: {
        DEFAULT: colors.border.primary,
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
