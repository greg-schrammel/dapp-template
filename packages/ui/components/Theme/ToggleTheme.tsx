import { useIsMounted } from 'hooks'
import { MoonIcon, SunIcon } from 'icons'
import { useTheme } from 'next-themes'
import { Button } from '../Button'

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme()
  const isMounted = useIsMounted()
  return (
    <Button variant="icon" onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
      {isMounted && resolvedTheme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
