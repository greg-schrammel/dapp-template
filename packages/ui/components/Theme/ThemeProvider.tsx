import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { TooltipProvider } from '../Tooltip'

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider attribute="class">
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemeProvider>
  )
}
