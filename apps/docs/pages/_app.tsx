import { MDXProvider } from '@mdx-js/react'
import { MDX } from 'components'
import { MetaHead, MetaProps } from 'components/MetaHead'
import { DocsLayout, LayoutProps } from 'layouts/DocsLayout'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import 'globals.css'
import 'ui/fonts'

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType & {
    Layout?: React.FC<LayoutProps>
    Meta?: MetaProps
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DocsLayout

  return (
    <MDXProvider components={MDX}>
      <MetaHead meta={Component.Meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  )
}
