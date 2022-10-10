import clsx from 'clsx'
import { ExternalIcon } from 'icons'
import { AnchorHTMLAttributes } from 'react'

export const ExternalLink = ({ href, children, className }: AnchorHTMLAttributes<{}>) => {
  return (
    <a
      className={clsx(
        'hover:text-high inline-flex items-center gap-1 font-semibold hover:underline',
        className,
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <ExternalIcon className="text-[10px]" />
    </a>
  )
}
