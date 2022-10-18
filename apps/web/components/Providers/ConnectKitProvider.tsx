import { ConnectKitProvider as CKProvider } from 'connectkit'
import { PropsWithChildren } from 'react'
import { ckTheme } from 'styles/connectKitTheme'

import { useTheme } from 'ui'

export const ConnectKitProvider = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme()
  return (
    <CKProvider customTheme={ckTheme} mode={resolvedTheme as 'light' | 'dark'}>
      {children}
    </CKProvider>
  )
}
