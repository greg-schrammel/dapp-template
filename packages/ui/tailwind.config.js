const defaultTheme = require('tailwindcss/defaultTheme')
const { themePlugin, theme } = require('./plugins/themePlugin')

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
      colors: theme,
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '14px',
      },
      backgroundColor: theme.background,
      textColor: theme.text,
      borderColor: { ...theme.border, DEFAULT: theme.border.primary },
      outlineColor: { ...theme.border, DEFAULT: theme.border.primary },
      boxShadow: { ...theme.shadow, DEFAULT: theme.shadow.primary },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [themePlugin],
}
