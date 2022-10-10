import { Hydrate, HydrateProps, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { PropsWithChildren, useState } from 'react'
import { ckTheme } from 'styles/connectKitTheme'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'

import { ThemeProvider, useTheme } from 'ui'

export const appChains = [chain.mainnet, chain.goerli]

const { webSocketProvider, provider, chains } = configureChains(
  appChains,
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID, priority: 1 })],
  { stallTimeout: 5000 },
)

const connectors = [
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: { qrcode: false } }),
]

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const _ConnectKitProvider = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme()
  return (
    <ConnectKitProvider customTheme={ckTheme} mode={resolvedTheme as 'light' | 'dark'}>
      {children}
    </ConnectKitProvider>
  )
}

export function AppProviders({
  children,
  state,
}: PropsWithChildren<{ state: HydrateProps['state'] }>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>
        <WagmiConfig client={client}>
          <ThemeProvider>
            <_ConnectKitProvider>{children}</_ConnectKitProvider>
          </ThemeProvider>
        </WagmiConfig>
      </Hydrate>
    </QueryClientProvider>
  )
}
