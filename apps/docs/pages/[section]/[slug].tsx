import fs from 'fs-extra'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import type { PropItem } from 'react-docgen-typescript'

import { rehypeCodeMeta } from 'rehypeCodeMeta.mjs'
import { getStaticTypes } from 'utils/getStaticTypes'
import { createGitHubLink } from 'utils/github'
import { links } from 'utils/links.mjs'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: links.map(({ section, name }) => ({ params: { section, slug: name } })),
  fallback: false,
})

type StaticProps = {
  docsLink: string
  frontMatter: Record<string, any>
  source: MDXRemoteSerializeResult
  sourceLink: string
  staticTypes?: Record<string, PropItem>
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const slug = context.params?.slug?.toString() as string
  const section = context.params?.section?.toString() as string

  const pathname = links.find((l) => l.name === slug && l.section === section).path

  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { rehypePlugins: [rehypeCodeMeta] },
  })

  const componentPathname = pathname.replace('docs.mdx', 'tsx')
  const staticTypes = getStaticTypes(componentPathname)[slug] ?? null

  const docsLink = createGitHubLink(pathname.replace(/^(?:(?!\/packages).)*/i, ''))
  const sourceLink = createGitHubLink(componentPathname.replace(/^(?:(?!\/packages).)*/i, ''))

  return {
    props: {
      docsLink,
      frontMatter: data,
      source: mdxSource,
      sourceLink,
      staticTypes,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page = ({ docsLink, source, sourceLink, staticTypes }: Props) => {
  return (
    <MDXRemote
      {...source}
      scope={{
        ...source.scope,
        sourceLink,
        types: staticTypes,
      }}
    />
  )
}

export default Page
