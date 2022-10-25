import { ArrowDownIcon } from 'icons'
import { useState } from 'react'
import { Button, cx, inputStyles, NumberInput, NumberInputProps } from 'ui'
import { useFeeData } from 'wagmi'
import { CurrencySelector } from './CurrencySelector'

const useDerivedFields = () => {
  const [[a, b], setInputs] = useState(['', ''])

  const price = 1

  const handleInput: (id: number) => NumberInputProps['onValueChange'] =
    (id) =>
    (e, { source }) => {
      if (source === 'prop') return

      // derive(id === 0 ? a : b)

      const value = e.floatValue || 0
      const other = id === 0 ? 1 : 0
      const derived = id === 0 ? value * price : value / price
      {
        let newInputs: [string, string] = [a, b]
        newInputs[id] = (value || '').toString()
        newInputs[other] = derived === 0 ? '' : derived.toPrecision(6)
        setInputs(newInputs)
      }
    }

  return {
    buyFieldProps: { onValueChange: handleInput(0), value: a },
    sellFieldProps: { onValueChange: handleInput(1), value: b },
    switchFields: () => setInputs([b, a]),
  }
}

const CurrencyAmountField = ({ ...props }: Omit<NumberInputProps, 'placeholder'>) => {
  return (
    <div className={cx('flex items-center', inputStyles({ size: 'md' }))}>
      <div className="flex flex-col gap-2">
        <NumberInput variant="unstyled" placeholder="1" size={null} {...props} />
        <span className="text-low text-xs">$ 1,212.32</span>
      </div>
      <div className="-mr-2 flex flex-col gap-1">
        <CurrencySelector />
        <Button variant="secondary" size="xs">
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
