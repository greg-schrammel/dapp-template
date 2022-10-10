const fs = require('fs-extra')
const glob = require('glob')
const { transform, Config } = require('@svgr/core')
const { pascalCase } = require('change-case')

const path = require('path')

/** @type {Config["template"]} */
const template = ({ imports, interfaces, componentName, props, jsx }, { tpl }) => {
  return tpl`
    import clsx from 'clsx'
    ${imports}
    ${interfaces}

    export const ${componentName} = (${props}) => (${jsx})
`
}

/** @type {Config} */
const svgrConfig = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  replaceAttrValues: { '#000': 'currentColor', black: 'currentColor' },
  svgProps: {
    className: "{clsx('h-[1em] w-[1em]', props.className)}",
  },
  expandProps: 'start',
  svgoConfig: {
    multipass: true,
    plugins: ['removeDimensions'],
  },
  prettier: false,
  jsxRuntime: 'automatic',
  typescript: true,
  svgo: true,
  titleProp: true,
  template,
}

const baseDir = __dirname
const iconComponentsDir = path.join(baseDir, '/components')

;(async () => {
  // Clean old files
  const svgComponentPaths = glob.sync('Icon*/', { cwd: iconComponentsDir, absolute: true })
  console.log('Cleaning old icons...')
  for (const svgComponentPath of svgComponentPaths) {
    await fs.remove(svgComponentPath)
  }

  // Get SVGs to generate
  const svgFilePaths = glob.sync('./svgs/*.svg', { cwd: baseDir, absolute: true })

  console.log('Generating icons...')
  for (const svgFilePath of svgFilePaths) {
    const rawSvg = await fs.readFile(svgFilePath, 'utf8')
    const svg = rawSvg.replace(/ data-name=".*?"/g, '')

    const componentName = `${pascalCase(path.basename(svgFilePath, '.svg'))}Icon`

    const svgComponentCode = transform.sync(svg, svgrConfig, { componentName })

    await fs.writeFile(path.join(iconComponentsDir, `${componentName}.tsx`), svgComponentCode, {
      encoding: 'utf-8',
    })
  }

  // Create icons/index.ts
  const iconComponentNames = (await fs.readdir(iconComponentsDir)).filter((fileOrDir) =>
    fileOrDir.includes('Icon'),
  )
  const iconExports = iconComponentNames
    .map((componentFile) => path.basename(componentFile, '.tsx'))
    .map((component) => `export { ${component} } from './${component}'`)
    .join('\n')
    .concat('\n')
  const iconsIndexPath = path.join(iconComponentsDir, 'index.ts')
  await fs.remove(iconsIndexPath)
  console.log('Generating icon index...')
  await fs.writeFile(iconsIndexPath, iconExports, 'utf-8')
  console.log('Done.')
})()
