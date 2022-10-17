import { ExternalIcon } from 'icons'
import { AnchorHTMLAttributes } from 'react'
import { cx } from '../../utils'

export type ExternalLinkProps = AnchorHTMLAttributes<{}>
export const ExternalLink = ({ href, children, className }: ExternalLinkProps) => {
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
      <ExternalIcon aria-hidden className="text-[10px]" />
    </a>
  )
}
