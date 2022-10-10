type BaseCurrency = {
  decimals: number
  symbol: string
  name: string
  totalSupply?: BigInt
}

declare global {
  declare type Address = `0x${string}`

  declare type Currency =
    | ({ isToken: true; isNative: false; address: Address } & BaseCurrency)
    | ({ isToken: false; isNative: true } & BaseCurrency)

  declare type CurrencyAmount = { amount: BigInt; currency: Currency }
}

export {}
