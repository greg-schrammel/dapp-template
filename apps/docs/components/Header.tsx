import { MenuIcon } from 'icons'
import { Link } from './Link'

export const Header = ({
  onMenuClick,
  isMenuOpen,
}: {
  onMenuClick: VoidFunction
  isMenuOpen: boolean
}) => (
  <header className="bg-primary/20 fixed top-0 z-20 flex h-14 w-full items-center gap-4 border-b px-4 shadow-lg backdrop-blur-md">
    <button
      onClick={onMenuClick}
      className="text-low hover:text-high hover:border-high focus-visible:border-high focus-visible:text-high block rounded-md border-2 p-1 lg:hidden "
    >
      <MenuIcon className="h-4 w-4" title={isMenuOpen ? 'Close menu' : 'Open menu'} />
    </button>

    <Link href="/">
      <h1 className="text-high text-lg font-bold">Docs</h1>
    </Link>
  </header>
)
