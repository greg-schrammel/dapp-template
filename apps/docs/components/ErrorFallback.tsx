import Link from 'next/link'
import { FallbackProps } from 'react-error-boundary'
import { Button } from 'ui'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="mt-8 flex flex-col gap-10  md:mt-0 md:items-center">
      <div className="w-full max-w-screen-md md:mb-2">
        <p className="text-low mt-3">
          Something went wrong <br />{' '}
          <Button asChild>
            <Link href="/">Back</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
