import { cva, VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import { useState } from 'react'
import { image } from 'token-icons'

type TokenIconProps = {
  /** token address */
  address: string
  /** token symbol to add to fallback on error */
  symbol?: string
} & VariantProps<typeof tokenIconStyles>

export const tokenIcon = (address: string) => {
  try {
    return image(address) || ''
  } catch {
    return ''
  }
}

const tokenIconStyles = cva(
  'bg-tertiary overflow-hidden rounded-full border text-xs text-center text-low font-medium',
  {
    variants: {
      size: {
        sm: 'leading-[22px] h-6 w-6 text-[8px]',
      },
    },
  },
)

const sizePx = (size: NonNullable<TokenIconProps['size']>) => ({ sm: 24 }[size])

export const TokenIcon = ({ address, symbol, size = 'sm' }: TokenIconProps) => {
  const [isError, setError] = useState(false)
  if (isError) return <div className={tokenIconStyles({ size })}>{symbol}</div>
  return (
    <Image
      src={tokenIcon(address)}
      alt=""
      width={sizePx(size || 'sm')}
      height={sizePx(size || 'sm')}
      unoptimized
      className={tokenIconStyles({ size })}
      onError={() => setError(true)}
    />
  )
}
