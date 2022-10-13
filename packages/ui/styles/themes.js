const { colors } = require('./colors')

const darkTheme = {
  text: {
    high: colors.grey[50],
    medium: colors.grey[200],
    low: colors.grey[300],
  },
  border: {
    primary: colors.grey[500],
    secondary: colors.grey[800],
  },
  background: {
    primary: colors.grey[800],
    secondary: colors.grey[700],
    tertiary: colors.grey[600],
    contrast: colors.grey[400],
  },
  shadow: {
    primary: '0px 4px 12px rgba(250, 250, 250, 0.01)',
  },
}

const lightTheme = {
  text: {
    high: colors.grey[800],
    medium: colors.grey[500],
    low: colors.grey[400],
  },
  border: {
    primary: colors.grey[100],
    secondary: colors.grey[800],
  },
  background: {
    primary: colors.grey[50],
    secondary: '#fff',
    tertiary: colors.grey[100],
    contrast: colors.grey[200],
  },
  shadow: {
    primary: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
}

module.exports.darkTheme = darkTheme
module.exports.lightTheme = lightTheme
module.exports.theme = /** @type {typeof lightTheme} */ (
  require('./utils').objToVars({ colors, ...lightTheme })
)

// --shadow-primary: '0px 4px 12px rgba(250, 250, 250, 0.01)'
