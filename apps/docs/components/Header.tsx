import { MenuIcon } from 'icons'
import Link from 'next/link'
import { Button, ToggleTheme } from 'ui'

export const Header = ({
  onMenuClick,
  isMenuOpen,
}: {
  onMenuClick: VoidFunction
  isMenuOpen: boolean
}) => (
  <header className="bg-primary/20 fixed top-0 z-20 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-md">
    <div className="flex items-center gap-4">
      <Button variant="icon" size="md" onClick={onMenuClick}>
        <MenuIcon className="h-4 w-4" title={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </Button>

      <Link href="/">
        <h1 className="text-high text-lg font-bold">
          dapp <span className="text-low text-sm font-medium">docs</span>
        </h1>
      </Link>
    </div>
    <ToggleTheme />
  </header>
)
