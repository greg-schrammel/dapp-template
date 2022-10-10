// organize-imports-ignore
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { OnValueChange } from 'react-number-format/types/types'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const numberInputStyles = cva(['font-sans'], {
  variants: {
    variant: {
      unstyled: 'bg-transparent',
      primary: [
        'bg-primary rounded border transition-all outline-border outline-2',
        'px-4',
        'focus:outline',
        'min-w-0 max-w-full',
      ],
    },
    size: {
      md: 'h-12',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
})

export type NumberInputProps = {
  onValueChange: OnValueChange
  value: string | number | undefined
  placeholder: string
  /**
   * if set to `false` negative numbers will not be allowed
   * default: true
   */
  allowNegative?: boolean
  /** limits the number of digits after the decimal point */
  decimalScale?: number
} & VariantProps<typeof numberInputStyles>

export const NumberInput = ({
  variant = 'primary',
  size = 'md',
  value,
  onValueChange,
  placeholder,
  allowNegative,
  decimalScale,
  fullWidth,
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
      className={numberInputStyles({ variant, size, fullWidth })}
    />
  )
}
