import { DefaultLayout, LayoutProps } from 'components/Layout'
import { MetaHead, MetaProps } from 'components/MetaHead'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import { AppProviders } from 'components/Providers'
import 'ui/fonts'
import 'ui/styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType & {
    Layout?: React.FC<LayoutProps>
    Meta?: MetaProps
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout

  return (
    <AppProviders>
      <MetaHead meta={Component.Meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  )
}
