import { PropsWithChildren } from 'react'
import { ConnectButton } from './ConnectButton'

export type LayoutProps = PropsWithChildren<{}>

const TopBar = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 pt-4 md:px-7 md:pt-7">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <h1 className="font-bold">Dapp</h1>
          <span className="text-low text-xs">Template</span>
        </div>
      </div>
      <ConnectButton />
    </header>
  )
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopBar />
      <main className="relative mx-auto mb-40 flex min-h-screen max-w-screen-lg flex-col p-4 md:p-7">
        {children}
      </main>
    </>
  )
}
