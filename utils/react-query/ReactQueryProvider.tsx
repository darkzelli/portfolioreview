// In Next.js, this file would be called: app/providers.jsx
'use client'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { isServer, QueryClient, QueryClientProvider,} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime:  1000 * 60 * 60 * 12,
        staleTime: 45000
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined
const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'RQ_PERSISTENT_CACHE',
  throttleTime: 2500,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
})

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister: persister, maxAge: 1000 * 60 * 60 * 12,}}>{children}</PersistQueryClientProvider>
  )
}
