// organize-imports-ignore
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const inputStyles = cva(['font-sans font-medium placeholder:text-low'], {
  variants: {
    variant: {
      unstyled: 'bg-transparent outline-none',
      primary: [
        'bg-primary rounded border transition-all outline-border outline-2',
        'focus:outline',
        'min-w-0 max-w-full',
      ],
    },
    size: {
      sm: 'h-auto min-h-10 text-sm px-2 py-1',
      md: 'h-12 px-4',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  placeholder?: string
} & VariantProps<typeof inputStyles>

export const Input = ({ fullWidth, size, variant, ...props }: InputProps) => {
  return <input {...props} className={inputStyles({ fullWidth, size, variant })} />
}
