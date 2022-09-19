import { PropsWithChildren } from 'react'

export type LayoutProps = PropsWithChildren<{}>

export const DefaultLayout = ({ children }: LayoutProps) => {
  return <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col">{children}</main>
}
