import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { useIsMounted } from 'utils/isMounted'
import { Link } from './Link'

type Link = { section: string; name: string; route: string; path: string }

const NavLink = ({
  active,
  href,
  children,
}: React.PropsWithChildren<{
  active?: boolean
  href: string
}>) => {
  return (
    <Link href={href}>
      <div
        className={clsx(
          'font-base hover:bg-secondary group -mx-2 w-auto rounded-lg border-2 border-transparent px-2 py-1 hover:border-white/5',
          'focus:no-underline active:opacity-90',
        )}
      >
        <span
          className={clsx(
            'group-hover:text-high',
            active ? 'text-high font-medium' : 'text-medium',
          )}
        >
          {children}
        </span>
      </div>
    </Link>
  )
}

const NavSection = ({ name, links }: { name: string; links: Link[] }) => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Collapsible.Root className="flex flex-col" key={name} open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger
        className={clsx(
          `hover:text-medium text-low py-1 text-left text-sm font-semibold uppercase`,
          !isOpen && 'text-medium hover:text-high',
        )}
      >
        {name}
      </Collapsible.Trigger>

      <Collapsible.Content forceMount className="flex flex-col">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={{
                open: { opacity: 1, transition: { staggerChildren: 0.1, staggerDirection: 1 } },
                close: { opacity: 0, transition: { staggerChildren: 0.1, staggerDirection: -1 } },
              }}
              initial="close"
              animate="open"
              exit="close"
            >
              {links.map((item) => (
                <motion.span
                  key={item.route}
                  variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
                >
                  <NavLink
                    active={isMounted && router.asPath.split('#')[0] === item.route}
                    href={item.route}
                    key={item.route}
                  >
                    {item.name}
                  </NavLink>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export type SidebarProps = { links: Link[]; isOpen: boolean }

export const Sidebar = ({ links, isOpen }: SidebarProps) => {
  const router = useRouter()

  const componentsLinks = links.filter((l) => l.section === 'components') ?? []
  const guidesLinks = links.filter((l) => l.section === 'guides') ?? []

  return (
    <motion.aside
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      className={clsx(
        'fixed top-14 z-20 h-screen px-4',
        isOpen ? 'bg-primary/90 w-full backdrop-blur-md' : 'w-52',
      )}
    >
      <div className="flex flex-col">
        <div className={clsx(isOpen ? 'block' : 'hidden', 'h-full pt-5 md:pb-48 lg:block')}>
          <div className="flex flex-col gap-6">
            <NavSection name="guides" links={guidesLinks} />
            <NavSection name="components" links={componentsLinks} />
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
