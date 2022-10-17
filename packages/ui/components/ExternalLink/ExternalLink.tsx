import { ExternalIcon } from 'icons'
import { AnchorHTMLAttributes } from 'react'
import { cx } from '../../utils'

export const ExternalLink = ({ href, children, className }: AnchorHTMLAttributes<{}>) => {
  return (
    <a
      className={cx(
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
