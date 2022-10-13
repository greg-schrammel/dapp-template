const plugin = require('tailwindcss/plugin')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

const { objToTailwindVars } = require('./utils')
const { lightTheme, darkTheme } = require('./themes')

module.exports.themePlugin = plugin(({ addComponents, config }) => {
  const options = { colorVariables: true, forceRGB: true, darkToRoot: false }
  addComponents(variablesApi.variables({ DEFAULT: { ...lightTheme } }, options))
  addComponents(
    variablesApi.darkVariables({ DEFAULT: { ...darkTheme } }, options, config('darkMode')),
  )
})

module.exports.theme = /** @type {typeof lightTheme} */ (objToTailwindVars(lightTheme))
