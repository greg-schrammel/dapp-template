import { Hydrate, HydrateProps, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export function ReactQueryProvider({
  children,
  state,
}: PropsWithChildren<{ state: HydrateProps['state'] }>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>{children}</Hydrate>
    </QueryClientProvider>
  )
}
