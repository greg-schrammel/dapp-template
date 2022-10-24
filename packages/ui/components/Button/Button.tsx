import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren } from 'react'

const buttonBaseStyles = cva([
  'h-min transition-all rounded relative',
  'font-semibold font-sans',
  'outline-none ring-0 ring-primary',
  'hover:text-high hover:ring-2',
  'focus:ring-2 focus:bg-tertiary',
])

const buttonStyles = cva(buttonBaseStyles({ class: 'flex gap-2 items-center justify-center' }), {
  variants: {
    variant: {
      primary: ['text-low bg-tertiary border'],
      secondary: ['text-low hover:text-high hover:bg-tertiary'],
    },
    size: {
      sm: 'py-1 px-3 rounded-sm',
      md: 'py-2 px-4',
      lg: 'py-3 px-8',
    },
    fullWidth: { true: 'w-full', false: 'w-auto' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

const iconButtonStyles = cva(
  buttonBaseStyles({ class: 'text-low hover:bg-tertiary hover:ring-2' }),
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
  /** Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied
   * element/component and change the underlying DOM node. */
  asChild?: boolean
} & VariantProps<typeof buttonStyles>

type IconButtonProps = {
  variant: 'icon'
  asChild?: never
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

    const { fullWidth, asChild, ...baseProps } = props
    const Component = asChild ? Slot : 'button'
    return (
      <Component ref={ref} {...baseProps} className={buttonStyles({ variant, size, fullWidth })} />
    )
  },
)
