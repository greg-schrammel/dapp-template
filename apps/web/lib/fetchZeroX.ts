type ZeroXSource =
  | '0x'
  | 'Uniswap'
  | 'Uniswap_V2'
  | 'Curve'
  | 'Balancer'
  | 'Balancer_V2'
  | 'Bancor'
  | 'BancorV3'
  | 'mStable'
  | 'SushiSwap'
  | 'Shell'
  | 'MultiHop'
  | 'DODO'
  | 'DODO_V2'
  | 'LiquidityProvider'
  | 'CryptoCom'
  | 'Lido'
  | 'MakerPsm'
  | 'KyberDMM'
  | 'Component'
  | 'Saddle'
  | 'Uniswap_V3'
  | 'Curve_V2'
  | 'ShibaSwap'
  | 'Synapse'
  | 'Synthetix'

type ZeroXOrder = {
  type: 0
  source: ZeroXSource
  makerToken: Address
  takerToken: Address
  makerAmount: string
  takerAmount: string
  fillData: {
    router: Address
    tokenAddressPath: [Address, Address]
    uniswapPath: string
    gasUsed: number
  }
  fill: {
    input: string
    output: string
    adjustedOutput: string
    gas: number
  }
  sourcePathId: string
}

type ZeroXQuote = {
  chainId: number
  price: string
  guaranteedPrice: string
  estimatedPriceImpact: string
  to: Address
  data: string
  value: string
  gas: string
  estimatedGas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: Address
  sellTokenAddress: Address
  buyAmount: string
  sellAmount: string
  sources: Array<{ name: ZeroXSource; proportion: string }>
  orders: ZeroXOrder[]
  allowanceTarget: Address
  decodedUniqueId: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  expectedSlippage: string
}

type BigIntish = BigInt | string | number
type Token = Address | 'ETH'

type FetchQuoteParams = {
  buyToken: Token
  sellToken: Token
} & ({ sellAmount: BigIntish; buyAmount: never } | { sellAmount: never; buyAmount: BigIntish })

/** 0x affiliate commission config */
const affiliateAddress: Address = '0x507F0daA42b215273B8a063B092ff3b6d27767aF'
const feeRecipient = affiliateAddress
const feePercentage = '0.1'
/** - */

export const fetchQuote = ({ buyToken, sellToken, sellAmount, buyAmount }: FetchQuoteParams) =>
  fetch(
    `https://api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&${
      !!sellAmount ? `sellAmount=${sellAmount}` : `buyAmount=${buyAmount}`
    }&feeRecipient=${feeRecipient}&buyTokenPercentageFee=${feePercentage}&affiliateAddress=${affiliateAddress}`,
  ).then<ZeroXQuote>((d) => d.json())
