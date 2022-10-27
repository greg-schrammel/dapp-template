const colors = require('./colors')
const { grey } = colors

const darkTheme = {
  colors: {
    text: {
      high: grey[50],
      medium: grey[300],
      low: grey[300],
    },
    border: {
      primary: grey[500],
      secondary: grey[400],
    },
    background: {
      primary: grey[800],
      secondary: grey[700],
      tertiary: grey[600],
      contrast: grey[400],
    },
  },
  shadow: {
    primary: '0px 4px 12px rgba(250, 250, 250, 0.01)',
  },
}

const lightTheme = {
  colors: {
    text: {
      high: grey[800],
      medium: grey[400],
      low: grey[300],
    },
    border: {
      primary: grey[200],
      secondary: grey[200],
    },
    background: {
      primary: grey[50],
      secondary: '#fff',
      tertiary: grey[100],
      contrast: grey[200],
    },
  },
  shadow: {
    primary: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
}

module.exports.darkTheme = darkTheme
module.exports.lightTheme = lightTheme

/* theme object has no "real" value, only css variable references */
module.exports.theme = /** @type {typeof lightTheme} */ (
  require('../plugins/utils').objToVars({ colors, ...lightTheme })
)
