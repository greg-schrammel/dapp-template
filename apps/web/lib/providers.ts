import { providers as multicallProvider } from '@0xsequence/multicall'
import { env } from 'env/client.mjs'
import { providers } from 'ethers'

const stallTimeout = 500 // timeout in milliseconds after which another provider will be attempted.
const getFallbackProvider = (chainId: number) => {
  const providerConfigs = []

  if (env.NEXT_PUBLIC_INFURA_ID)
    providerConfigs.push({
      provider: new providers.InfuraProvider(chainId, env.NEXT_PUBLIC_INFURA_ID),
      priority: 0,
      stallTimeout,
    })

  if (env.NEXT_PUBLIC_ALCHEMY_ID)
    providerConfigs.push({
      provider: new providers.AlchemyProvider(chainId, env.NEXT_PUBLIC_ALCHEMY_ID),
      priority: 1,
      stallTimeout,
    })

  if (env.NEXT_PUBLIC_ETHERSCAN_API_KEY)
    providerConfigs.push({
      provider: new providers.EtherscanProvider(chainId, env.NEXT_PUBLIC_ETHERSCAN_API_KEY),
      priority: 2,
      stallTimeout,
    })

  return new providers.FallbackProvider(providerConfigs, 1)
}

const singletonProvider: { [chainId: number]: providers.BaseProvider } = {}

export const provider = (chainId: number) => {
  if (singletonProvider[chainId]) return singletonProvider[chainId]
  const f = getFallbackProvider(chainId)
  const p = new multicallProvider.MulticallProvider(f, { timeWindow: 1000 })
  p._network = f._network
  singletonProvider[chainId] = p
  return singletonProvider[chainId]
}

export const wsProvider = (chainId: number) => {
  if (env.NEXT_PUBLIC_INFURA_ID)
    return new providers.InfuraWebSocketProvider(chainId, env.NEXT_PUBLIC_INFURA_ID)
  if (env.NEXT_PUBLIC_ALCHEMY_ID)
    return new providers.AlchemyWebSocketProvider(chainId, env.NEXT_PUBLIC_ALCHEMY_ID)
}
