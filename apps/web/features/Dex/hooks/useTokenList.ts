import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Contract } from 'ethers'
import { provider } from 'lib/providers'
import { tokenIcon } from 'ui'

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

const erc20 = (address: Address, chainId: number) => {
  return new Contract(
    address,
    [
      'function symbol() external view returns (string)',
      'function decimals() external view returns (uint8)',
      'function name() external view returns (string)',
    ],
    provider(chainId),
  )
}

const fetchToken = async (address: Address, chainId: number): Promise<Token> => {
  const token = erc20(address, chainId)
  const [symbol, decimals, name] = await Promise.all([
    token.symbol(),
    token.decimals(),
    token.name(),
  ])

  return { chainId, address, name, symbol, decimals, logoURI: tokenIcon(address) }
}

const allTokensQueryKey = ['tokens']

export const useToken = (token: Address, chainId: number = 1) => {
  const queryClient = useQueryClient()
  useQuery<Token>([token, chainId], () => fetchToken(token, chainId), {
    initialData: () => {
      return queryClient.getQueryData<Token[]>(allTokensQueryKey)?.find((d) => d.address === token)
    },
  })
}

export const useTokenList = (tokenListUrl: string) => {
  const queryClient = useQueryClient()
  return useQuery<TokenList>([tokenListUrl], () => fetch(tokenListUrl).then((d) => d.json()), {
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess(data) {
      queryClient.setQueryData<Token[]>(allTokensQueryKey, (tokens = []) => [
        ...tokens,
        ...data.tokens,
      ])
    },
  })
}
