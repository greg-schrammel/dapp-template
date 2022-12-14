import { DefaultLayout, LayoutProps } from 'components/Layout'
import { MetaHead, MetaProps } from 'components/MetaHead'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from 'components/ErrorFallback'
import { Providers } from 'components/Providers'

import 'styles/globals.css'
import 'ui/fonts'

export type PageProps = { dehydratedState: Object }

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextComponentType<any, any, PageProps> & {
    Layout?: React.FC<LayoutProps>
    Meta?: MetaProps
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout

  return (
    <Providers pageProps={pageProps}>
      <MetaHead meta={Component.Meta} />
      <Layout>
        <ErrorBoundary
          // onError={(error, info) => /* send error to track */}
          fallbackRender={ErrorFallback}
        >
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </Providers>
  )
}
