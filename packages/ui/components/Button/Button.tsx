import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren } from 'react'

export const buttonStyles = cva(
  [
    'h-min transition-all rounded relative',
    'font-semibold font-sans',
    'hover:text-high hover:outline focus:outline focus:outline-background-contrast',
  ],
  {
    variants: {
      variant: {
        primary: ['text-low bg-tertiary outline-border border outline-2', 'py-2 px-4'],
        secondary: ['hover:bg-tertiary', 'py-2 px-4'],
        icon: ['text-low hover:bg-tertiary outline-border hover:outline-2', 'py-1 px-1'],
      },
      bleed: { true: '', false: '' },
      fullWidth: { true: 'w-full', false: 'w-auto' },
    },
    compoundVariants: [
      { variant: 'primary', bleed: true, class: '-my-2 -mx-4' },
      { variant: 'secondary', bleed: true, class: '-my-2 -mx-4' },
    ],
    defaultVariants: { variant: 'primary' },
  },
)

export type ButtonProps = PropsWithChildren<
  {
    /** width 100% */
    fullWidth?: boolean
    onClick: VoidFunction
    /** button padding should be countered with negative margin */
    bleed?: boolean
    disabled?: boolean
  } & VariantProps<typeof buttonStyles>
>

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      fullWidth = false,
      bleed = false,
      onClick,
      disabled,
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        disabled={disabled}
        type="button"
        className={buttonStyles({ variant, bleed, fullWidth })}
        onClick={onClick}
      >
        {children}
      </button>
    )
  },
)
