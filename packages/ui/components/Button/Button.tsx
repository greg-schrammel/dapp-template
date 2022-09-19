import clsx from 'clsx'
import { PropsWithChildren, ReactNode } from 'react'

export type ButtonProps = PropsWithChildren<HTMLButtonElement> & {
  /** add a node to the button's left */
  left?: ReactNode
}

export const Button = ({ className, children, left }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        'rounded-xl bg-blue-500 px-4 py-2 font-sans font-bold text-white shadow-lg shadow-blue-300/10 transition-all hover:scale-105 hover:bg-opacity-90 focus-visible:outline-white active:scale-100',
        className,
      )}
    >
      {children}
    </button>
  )
}
