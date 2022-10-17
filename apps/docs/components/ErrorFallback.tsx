import Link from 'next/link'
import { FallbackProps } from 'react-error-boundary'
import { Button } from 'ui'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-2 md:mt-0">
      <p className="text-high mt-3">
        Something went wrong <br />{' '}
      </p>
      <Link href="/">
        <Button variant="secondary" size="sm">
          Back
        </Button>
      </Link>
    </div>
  )
}
