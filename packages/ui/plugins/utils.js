const isColorVar = (cssVar) => cssVar.startsWith('--colors')

const tailwindRgba = (cssVar) =>
  isColorVar ? /** @type {const} */ `rgba(var(${cssVar}), <alpha-value>)` : cssVar
const rgba = (cssVar) => (isColorVar ? /** @type {const} */ `rgba(var(${cssVar}), 1)` : cssVar)

const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj)
const objToVars =
  (extendVarName) =>
  (obj, varName = '-') => {
    const r = (obj, varName) =>
      Object.entries(obj).reduce((acc, [key, value]) => {
        const newVarName = `${varName}-${key}`
        return {
          ...acc,
          [key]: isObject(value) ? r(value, newVarName) : extendVarName(newVarName),
        }
      }, {})
    return r(obj, varName)
  }

module.exports.objToVars = objToVars(rgba)
module.exports.objToTailwindVars = objToVars(tailwindRgba)
