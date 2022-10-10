import { DefaultLayout, LayoutProps } from 'components/Layout'
import { MetaHead, MetaProps } from 'components/MetaHead'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import { AppProviders } from 'components/Providers'
import 'styles/globals.css'
import 'ui/fonts'

type PageProps = { dehydratedState: Object }

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextComponentType<any, any, PageProps> & {
    Layout?: React.FC<LayoutProps>
    Meta?: MetaProps
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout

  return (
    <AppProviders state={pageProps.dehydratedState}>
      <MetaHead meta={Component.Meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  )
}
