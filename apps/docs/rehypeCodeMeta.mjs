import { visit } from 'unist-util-visit'

/*
  rehype plugin to allow meta tags as props on mdx 
  ex 
  ```tsx live=true
    ...
  ```
  will pass live={true} to the code block component
*/

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g
/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
export function rehypeCodeMeta() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      let match
      if (node.tagName === 'code' && node.data && node.data.meta) {
        re.lastIndex = 0 // Reset regex.
        while ((match = re.exec(node.data.meta))) {
          node.properties[match[1]] = match[2] || match[3] || match[4] || ''
        }
      }
    })
  }
}

export default rehypeCodeMeta
