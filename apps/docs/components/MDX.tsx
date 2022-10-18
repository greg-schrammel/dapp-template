import slugify from '@sindresorhus/slugify'
import { PropsWithChildren } from 'react'

import { Components as MDXComponents } from '@mdx-js/react/lib/index'
import Link from 'next/link'
import { ExternalLink } from 'ui'
import { CodeBlock } from './CodeBlock'
import { PropsTable } from './PropsTable'

export const MDX: MDXComponents = {
  PropsTable,
  a: ExternalLink as any,
  code: CodeBlock as any,
  h1: ({ children }: PropsWithChildren) => {
    const id = slugify(children as string)
    return (
      <h1 className="text-high mb-8 block text-3xl font-bold" id={id}>
        {children}
      </h1>
    )
  },
  h2: ({ children }: PropsWithChildren) => {
    const id = slugify(children as string)
    return (
      <Link className="hover:text-medium w-full" href={`#${id}`}>
        <h2 className="text-high group mb-4 mt-12 block cursor-pointer text-xl font-bold" id={id}>
          <span className="group-hover:text-low -ml-4 pr-2 text-transparent">#</span>
          {children}
        </h2>
      </Link>
    )
  },
  p: ({ children }: PropsWithChildren) => <p className="text-medium w-full">{children}</p>,
  pre: (props: PropsWithChildren) => <pre className="my-6" {...props} />,
}
