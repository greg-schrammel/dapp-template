import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren } from 'react'

const buttonBaseStyles = cva([
  'h-min transition-all rounded relative',
  'font-semibold font-sans',
  'hover:text-high hover:outline outline-transparent',
  'focus:outline focus:outline-background-contrast',
])

const buttonStyles = cva(buttonBaseStyles(), {
  variants: {
    variant: {
      primary: ['text-low bg-tertiary outline-border border outline-2'],
      secondary: ['text-low hover:text-high hover:bg-tertiary'],
    },
    size: {
      sm: 'py-1 px-3 rounded-sm',
      md: 'py-2 px-4',
      lg: 'py-3 px-8',
    },
    bleed: { true: '', false: '' },
    fullWidth: { true: 'w-full', false: 'w-auto' },
  },
  compoundVariants: [
    { size: 'sm', bleed: true, class: '-my-1 -mx-3' },
    { size: 'md', bleed: true, class: '-my-2 -mx-4' },
    { size: 'lg', bleed: true, class: '-my-3 -mx-8' },
  ],
  defaultVariants: { variant: 'primary', size: 'md' },
})

const iconButtonStyles = cva(
  buttonBaseStyles({ class: 'text-low hover:bg-tertiary outline-border hover:outline-2' }),
  {
    variants: {
      size: {
        sm: 'py-1 px-1',
        md: 'py-2 px-2',
        lg: 'py-3 px-3',
      },
    },
  },
)

type DefaultButtonProps = {
  /** width 100% */
  fullWidth?: boolean
  /** counters the button padding with negative margin */
  bleed?: boolean
  /** Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied
   * element/component and change the underlying DOM node. */
  asChild?: boolean
} & VariantProps<typeof buttonStyles>

type IconButtonProps = {
  variant: 'icon'
  asChild?: never
  bleed?: never
  fullWidth?: never
} & VariantProps<typeof iconButtonStyles>

export type ButtonProps = PropsWithChildren<
  {
    onClick?: VoidFunction
    disabled?: boolean
  } & (DefaultButtonProps | IconButtonProps)
>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    if (variant === 'icon')
      return <button ref={ref} {...props} className={iconButtonStyles({ size })} />

    const { bleed, fullWidth, asChild, ...baseProps } = props
    const Component = asChild ? Slot : 'button'
    return (
      <Component
        ref={ref}
        {...baseProps}
        className={buttonStyles({ variant, size, bleed, fullWidth })}
      />
    )
  },
)
