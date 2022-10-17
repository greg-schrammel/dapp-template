import { MenuIcon } from 'icons'
import Link from 'next/link'
import { ToggleTheme } from 'ui'

export const Header = ({
  onMenuClick,
  isMenuOpen,
}: {
  onMenuClick: VoidFunction
  isMenuOpen: boolean
}) => (
  <header className="bg-primary/20 fixed top-0 z-20 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-md">
    <div className="flex gap-4">
      <button
        onClick={onMenuClick}
        className="text-low hover:text-high hover:border-high focus-visible:border-high focus-visible:text-high block rounded-md border-2 p-1 lg:hidden "
      >
        <MenuIcon className="h-4 w-4" title={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </button>

      <Link href="/">
        <h1 className="text-high text-lg font-bold">
          dapp <span className="text-low text-sm font-medium">docs</span>
        </h1>
      </Link>
    </div>
    <ToggleTheme />
  </header>
)
