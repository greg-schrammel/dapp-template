const rgb = (cssVar) => `rgb(var(--${cssVar}) / <alpha-value>)`

const base = {
  grey: {
    50: rgb(`grey-50`),
    300: rgb(`grey-300`),
    400: rgb(`grey-400`),
    500: rgb(`grey-500`),
    600: rgb(`grey-600`),
    700: rgb(`grey-700`),
    800: rgb(`grey-800`),
  },
}

const theme = {
  text: {
    high: rgb(`text-high`),
    low: rgb(`text-low`),
  },
  border: {
    primary: rgb(`border-color-primary`),
    secondary: rgb(`border-color-secondary`),
  },
  background: {
    primary: rgb(`background-color-primary`),
    secondary: rgb(`background-color-secondary`),
    tertiary: rgb(`background-color-tertiary`),
    contrast: rgb(`background-color-contrast`),
  },
}

module.exports = { ...base, ...theme }
