// organize-imports-ignore
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cx } from '../..'
import { ReactNode } from 'react'

export const inputStyles = cva(
  ['font-sans font-medium transition-all', 'ring-0 focus-within:ring-2 ring-primary outline-none'],
  {
    variants: {
      variant: {
        unstyled: 'bg-transparent outline-none focus:ring-0',
        primary: ['bg-primary rounded border', 'focus:ring', 'min-w-0 max-w-full'],
      },
      size: {
        sm: 'h-auto min-h-10 text-sm px-2 py-1',
        md: 'h-auto py-2 px-4',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  placeholder?: string
  /** append a react node to the left of the input value */
  left?: ReactNode
  /** append a react node to the right of the input value */
  right?: ReactNode
} & VariantProps<typeof inputStyles>

export const Input = ({ fullWidth, size, variant, left, right, ...props }: InputProps) => {
  return (
    <div className={cx(inputStyles({ fullWidth, size, variant }), 'flex items-center gap-2')}>
      {left}
      <input {...props} className="h-inherit placeholder:text-low w-full bg-inherit outline-none" />
      {right}
    </div>
  )
}
