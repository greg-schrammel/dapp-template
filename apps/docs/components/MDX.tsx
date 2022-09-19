import slugify from '@sindresorhus/slugify'
import { PropsWithChildren } from 'react'

import { Components as MDXComponents } from '@mdx-js/react/lib/index'
import { CodeBlock } from './CodeBlock'
import { Link } from './Link'
import { PropsTable } from './PropsTable'

export const MDX: MDXComponents = {
  PropsTable,
  // Default components
  // https://mdxjs.com/table-of-components/
  a: Link as any,
  code: CodeBlock as any,
  h2: ({ children }: PropsWithChildren) => {
    const id = slugify(children as string)
    return (
      <div className="mb-4 mt-12 block">
        <h1 className="text-high text-xl font-bold" id={id}>
          <Link className="hover:text-medium group w-full" href={`#${id}`}>
            {children}
            <span className="text-low ml-2 hidden group-hover:inline-block">#</span>
          </Link>
        </h1>
      </div>
    )
  },
  p: ({ children }: PropsWithChildren) => <p className="text-medium w-full">{children}</p>,
  pre: (props: PropsWithChildren) => <pre className="my-6" {...props} />,
}
