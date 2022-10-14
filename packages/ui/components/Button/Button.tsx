import { Slot } from '@radix-ui/react-slot'
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
        primary: ['text-low bg-tertiary outline-border border outline-2'],
        secondary: ['hover:bg-tertiary'],
        icon: ['text-low hover:bg-tertiary outline-border hover:outline-2'],
      },
      size: {
        sm: 'py-1 px-2',
        md: 'py-2 px-4',
        lg: 'py-3 px-8',
      },
      bleed: { true: '', false: '' },
      fullWidth: { true: 'w-full', false: 'w-auto' },
    },
    compoundVariants: [
      { variant: 'icon', size: 'sm', class: 'px-1 py-1' },
      { variant: 'icon', size: 'md', class: 'px-2 py-2' },
      { variant: 'icon', size: 'lg', class: 'px-3 py-3' },
      { size: 'sm', bleed: true, class: '-my-1 -mx-1' },
      { size: 'md', bleed: true, class: '-my-2 -mx-4' },
      { size: 'lg', bleed: true, class: '-my-3 -mx-8' },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonProps = PropsWithChildren<
  {
    /** width 100% */
    fullWidth?: boolean
    onClick?: VoidFunction
    /** button padding should be countered with negative margin */
    bleed?: boolean
    disabled?: boolean
    /** Change the component to the HTML tag or custom component of the only child.
     * This will merge the original component props with the props of the supplied
     * element/component and change the underlying DOM node. */
    asChild?: boolean
  } & VariantProps<typeof buttonStyles>
>

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      bleed = false,
      onClick,
      disabled,
      asChild = false,
    }: ButtonProps,
    ref,
  ) => {
    const Component = asChild ? Slot : 'button'
    return (
      <Component
        disabled={disabled}
        type="button"
        className={buttonStyles({ variant, size, bleed, fullWidth })}
        onClick={onClick}
      >
        {children}
      </Component>
    )
  },
)
