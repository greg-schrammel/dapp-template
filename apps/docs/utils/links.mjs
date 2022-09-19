import glob from 'glob'
import path from 'path'

const getPaths = (pattern) => glob.sync(pattern, { cwd: process.cwd(), absolute: true })

const makeLinks = (section, paths) =>
  paths.map((x) => {
    const name = path.basename(x, '.mdx').replace('.docs', '')
    const route = `/${section}/${name}`
    return { section, name, route, path: x }
  })

const componentsPaths = getPaths('../../packages/ui/components/**/*.docs.mdx')
const guidesPaths = getPaths('./guides/**/*.mdx')

export const componentLinks = makeLinks('components', componentsPaths)
export const guideLinks = makeLinks('guides', guidesPaths)

export const links = [...guideLinks, ...componentLinks] // Link[],
