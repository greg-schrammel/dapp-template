import Link from 'next/link'
import { Button } from 'ui'

export default function NotFound() {
  return (
    <div className="mt-8 flex flex-col gap-10  md:mt-0 md:items-center">
      <div className="w-full max-w-screen-md md:mb-2">
        <p className="text-low mt-3">
          Page not found <br />{' '}
          <Button asChild>
            <Link href="/">Back</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
