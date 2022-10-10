import clsx from 'clsx'
import NextLink from 'next/link'
import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'

const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) return false
  return true
}

export const Link: FC<PropsWithChildren<AnchorHTMLAttributes<'a'>> & { href: string }> = ({
  children,
  className,
  href,
}) => {
  const anchor = href.startsWith('#')
  const external = !href.startsWith('/') && !anchor
  if (external) {
    return (
      <a
        className={clsx('text-blue-500 underline-offset-2 hover:underline', className)}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink href={href} passHref prefetch={canPrefetch(href) ? undefined : false}>
        <a className={clsx('text-high', className)}>{children}</a>
      </NextLink>
    </>
  )
}
