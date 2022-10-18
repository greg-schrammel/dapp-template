import { PageProps } from 'pages/_app'
import { PropsWithChildren } from 'react'

import { ThemeProvider } from 'ui'
import { ConnectKitProvider } from './ConnectKitProvider'
import { ReactQueryProvider } from './ReactQueryProvider'
import { WagmiProvider } from './WagmiProvider'

export function Providers({ children, pageProps }: PropsWithChildren<{ pageProps: PageProps }>) {
  return (
    <ReactQueryProvider state={pageProps.dehydratedState}>
      <WagmiProvider>
        <ThemeProvider>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </ThemeProvider>
      </WagmiProvider>
    </ReactQueryProvider>
  )
}
