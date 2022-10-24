import { ArrowDownIcon } from 'icons'
import { useState } from 'react'
import { Button, cx, inputStyles, NumberInput, NumberInputProps } from 'ui'
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
    <div className={cx('flex items-center', inputStyles())}>
      <NumberInput variant="unstyled" placeholder="1" {...props} />
      <div className="mr-1">
        <CurrencySelector />
      </div>
    </div>
  )
}

export function DerivedFields() {
  const { buyFieldProps, sellFieldProps, switchFields } = useDerivedFields()

  return (
    <div className="w-md bg-secondary flex flex-col items-center gap-2 rounded border p-4">
      <CurrencyAmountField {...sellFieldProps} />
      <div className="-my-3">
        <Button variant="icon" onClick={switchFields}>
          <ArrowDownIcon title="swap for" />
        </Button>
      </div>
      <NumberInput placeholder={'1'} fullWidth {...buyFieldProps} />

      <Button fullWidth>Swap</Button>
    </div>
  )
}
