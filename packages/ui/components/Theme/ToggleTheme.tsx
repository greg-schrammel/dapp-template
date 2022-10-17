import { MoonIcon, SunIcon } from 'icons'
import { useTheme } from 'next-themes'
import { Button } from '../Button'

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button variant="icon" onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
      {resolvedTheme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
