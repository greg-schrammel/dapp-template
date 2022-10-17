import Link from 'next/link'
import { Button } from 'ui'

export default function NotFound() {
  return (
    <div className="mt-8 flex flex-col items-center gap-2 md:mt-0">
      <p className="text-high mt-3">
        Page not found <br />{' '}
      </p>
      <Link href="/">
        <Button variant="secondary" size="sm">
          Back
        </Button>
      </Link>
    </div>
  )
}
