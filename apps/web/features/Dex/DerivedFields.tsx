import { ArrowDownIcon } from 'icons'
import { useState } from 'react'
import { Button, cx, inputStyles, NumberInput, NumberInputProps } from 'ui'
import { useFeeData } from 'wagmi'
import { CurrencySelector } from './CurrencySelector'

const useDerivedFields = () => {
  const [[buyCurrency, sellCurrency], setCurrencies] = useState<(Address | null)[]>([null, null])
  const [[buyAmount, sellAmount], setAmounts] = useState(['', ''])

  const price = 1

  const handleCurrencyChange = (id: number) => (newCurrency: Address) => {
    setCurrencies((currencies) => {
      currencies[id] = newCurrency
      return currencies
    })
  }

  const handleAmountChange: (id: number) => NumberInputProps['onValueChange'] =
    (id) =>
    (e, { source }) => {
      if (source === 'prop') return

      // derive(id === 0 ? a : b)

      const value = e.floatValue || 0
      const other = id === 0 ? 1 : 0
      const derived = id === 0 ? value * price : value / price
      {
        let newInputs: [string, string] = [buyAmount, sellAmount]
        newInputs[id] = (value || '').toString()
        newInputs[other] = derived === 0 ? '' : derived.toPrecision(6)
        setAmounts(newInputs)
      }
    }

  return {
    buyFieldProps: {
      onAmountChange: handleAmountChange(0),
      amount: buyAmount,
      onCurrencyChange: handleCurrencyChange(0),
      currency: buyCurrency,
    },
    sellFieldProps: {
      onAmountChange: handleAmountChange(1),
      amount: sellAmount,
      onCurrencyChange: handleCurrencyChange(1),
      currency: sellCurrency,
    },
    switchFields: () => setAmounts([sellAmount, buyAmount]),
  }
}

type CurrencyAmountFieldProps = {
  amount: string
  currency: Address | null
  onAmountChange: NumberInputProps['onValueChange'] //(newAmount: string) => void
  onCurrencyChange: (newCurrency: Address) => void
}

const CurrencyAmountField = ({
  amount,
  currency,
  onCurrencyChange,
  onAmountChange,
}: CurrencyAmountFieldProps) => {
  return (
    <div className={cx('flex items-center', inputStyles({ size: 'md' }))}>
      <div className="flex flex-col gap-3">
        <NumberInput
          value={amount.toString()}
          onValueChange={onAmountChange}
          variant="unstyled"
          placeholder="1"
          size={null}
        />
        <span className="text-low text-xs">$ 1,212.32</span>
      </div>
      <div className="flex flex-col gap-3 p-1">
        <CurrencySelector selected={currency} onSelect={onCurrencyChange} />
        <Button variant="secondary" size="xs" bleed>
          Balance: 10
        </Button>
      </div>
    </div>
  )
}

const GasPrice = () => {
  const { data } = useFeeData({ formatUnits: 'gwei', cacheTime: Infinity, watch: true })

  return data?.formatted.gasPrice ? (
    <div className="text-low text-xs font-medium">
      ⛽ {(+data.formatted.gasPrice).toFixed(2)} gwei
    </div>
  ) : null
}

const RelativePrice = () => {
  return <span className="text-low text-xs font-medium">1 DAI = 1 DAI ($1.00)</span>
}

export function DerivedFields() {
  const { buyFieldProps, sellFieldProps, switchFields } = useDerivedFields()

  return (
    <div className="w-md bg-secondary flex flex-col items-center gap-2 rounded border p-3 pt-2">
      <h1 className="text-start text-low w-full p-1 text-sm font-medium">Swap</h1>
      <CurrencyAmountField {...buyFieldProps} />
      <div className="-my-3">
        <Button variant="icon" onClick={switchFields}>
          <ArrowDownIcon title="swap for" />
        </Button>
      </div>
      <CurrencyAmountField {...sellFieldProps} />

      <div className="flex w-full justify-between p-2">
        <RelativePrice />
        <GasPrice />
      </div>

      <Button fullWidth>Swap</Button>
    </div>
  )
}
