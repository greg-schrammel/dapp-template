import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { PropsWithChildren } from 'react'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'

export const appChains = [chain.mainnet, chain.goerli]

const { webSocketProvider, provider, chains } = configureChains(
  appChains,
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID, priority: 1 })],
  { stallTimeout: 5000 },
)

const { connectors } = getDefaultWallets({
  appName: 'gregstack',
  chains,
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}
