import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren } from 'react'
import { cx } from '../../utils'

const buttonBaseStyles = cx([
  'h-min transition-all rounded relative',
  'text-medium font-semibold font-sans',
  'outline-none ring-0 ring-primary',
  'hover:text-high hover:ring-2',
  'focus:ring-2 focus:bg-tertiary',
])

const compoundBleed = <Size extends string>(size: Size, classes: string) =>
  ({ size, bleed: true, class: classes } as const)

const buttonStyles = cva([buttonBaseStyles, 'flex gap-2 items-center justify-center'], {
  variants: {
    variant: {
      primary: ['bg-tertiary border'],
      secondary: ['hover:text-high hover:bg-tertiary'],
    },
    size: {
      xs: 'py-1 px-2 text-xs',
      sm: 'py-1 px-3',
      md: 'py-2 px-4',
      lg: 'py-3 px-8',
    },
    fullWidth: { true: 'w-full', false: 'w-auto' },
    bleed: { true: '', false: '' },
  },
  compoundVariants: [
    compoundBleed('xs', '-my-1 -mx-2'),
    compoundBleed('sm', '-my-1 -mx-3'),
    compoundBleed('md', '-my-2 -mx-4'),
    compoundBleed('lg', '-my-3 -mx-8'),
  ],
  defaultVariants: { variant: 'primary', size: 'md' },
})

const iconButtonStyles = cva([buttonBaseStyles, 'hover:bg-tertiary hover:ring-2'], {
  variants: {
    size: {
      sm: 'py-1 px-1',
      md: 'py-2 px-2',
      lg: 'py-3 px-3',
    },
    bleed: { true: '', false: '' },
  },
  compoundVariants: [
    compoundBleed('sm', '-my-1 -mx-1'),
    compoundBleed('md', '-my-2 -mx-2'),
    compoundBleed('lg', '-my-3 -mx-3'),
  ],
})

type DefaultButtonProps = {
  /** width 100% */
  fullWidth?: boolean
  /** counters the padding with negative margin */
  bleed?: boolean
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
  ({ variant = 'primary', size = 'md', bleed, ...props }, ref) => {
    if (variant === 'icon')
      return (
        <button
          ref={ref}
          {...props}
          className={iconButtonStyles({
            size: size as VariantProps<typeof iconButtonStyles>['size'], // fix types
            bleed,
          })}
        />
      )

    const { fullWidth, asChild, ...baseProps } = props
    const Component = asChild ? Slot : 'button'
    return (
      <Component
        ref={ref}
        {...baseProps}
        className={buttonStyles({ variant, size, fullWidth, bleed })}
      />
    )
  },
)
