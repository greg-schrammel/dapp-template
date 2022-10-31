import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { PropsWithChildren, useEffect } from 'react'
import { chain, configureChains, Connector, createClient, useConnect, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'

export const appChains = [chain.mainnet, chain.goerli]

const { webSocketProvider, provider, chains } = configureChains(
  appChains,
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID, priority: 1 })],
  { stallTimeout: 5000 },
)

const connectors = [
  new SafeConnector({ chains }),
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: { qrcode: false } }),
] as Connector[]

const isServer = typeof window === 'undefined'
const isIframe = !isServer && window?.parent !== window

const client = createClient({
  autoConnect: !isIframe,
  connectors,
  provider,
  webSocketProvider,
})

const AutoConnect = () => {
  // auto connects to gnosis safe if in context
  const { connect, connectors } = useConnect()
  useEffect(() => {
    const safeConnector = connectors.find((c) => c.id === 'safe')
    if (safeConnector?.ready) connect({ connector: safeConnector })
  }, [connect, connectors])
  return null
}

export function WagmiProvider({ children }: PropsWithChildren<{}>) {
  return (
    <WagmiConfig client={client}>
      {isIframe && <AutoConnect />}
      {children}
    </WagmiConfig>
  )
}
