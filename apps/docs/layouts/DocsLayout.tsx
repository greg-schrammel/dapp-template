import { PropsWithChildren, useEffect, useState } from 'react'

export type LayoutProps = PropsWithChildren<{}>

import { Sidebar, SidebarProps } from 'components'
import { Header } from 'components/Header'
import { useRouter } from 'next/router'

const useRouteChange = (onRouteChange: VoidFunction) => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const DocsLayout = ({ children }: LayoutProps) => {
  const links = process.env.links as unknown as SidebarProps['links']

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  useRouteChange(() => setIsSidebarOpen(false))

  return (
    <>
      <div className="mt-14 min-h-screen px-4">
        <main className="mx-auto max-w-screen-sm">
          <article className="max-w-full pt-12 pb-16">{children}</article>
        </main>
      </div>
      <Sidebar links={links} isOpen={isSidebarOpen} />
      <Header isMenuOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen((s) => !s)} />
    </>
  )
}
