import { useQuery } from '@tanstack/react-query'

export type Token = {
  chainId: number
  address: Address
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type TokenList = {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  tags: Object
  logoURI: string
  keywords: string[]
  tokens: Token[]
}

export const useTokenList = (tokenListUrl: string) =>
  useQuery<TokenList>([tokenListUrl], () => fetch(tokenListUrl).then((d) => d.json()), {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
