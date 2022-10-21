// organize-imports-ignore
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { OnValueChange } from 'react-number-format/types/types'
import type { VariantProps } from 'class-variance-authority'
import { inputStyles } from './Input'

export type NumberInputProps = {
  onValueChange: OnValueChange
  value: string | number | undefined
  placeholder: string
  /** if set to `false` negative numbers will not be allowed */
  allowNegative?: boolean
  /** limits the number of digits after the decimal point */
  decimalScale?: number
} & VariantProps<typeof inputStyles>

export const NumberInput = ({
  variant = 'primary',
  size = 'md',
  value,
  onValueChange,
  placeholder,
  allowNegative = true,
  decimalScale,
  fullWidth = false,
}: NumberInputProps) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      thousandSeparator
      allowedDecimalSeparators={['.', ',']}
      inputMode="decimal"
      valueIsNumericString
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      className={inputStyles({ variant, size, fullWidth })}
    />
  )
}
