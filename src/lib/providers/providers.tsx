import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
const queryClient = new QueryClient()
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster closeButton richColors />
      {children}
    </QueryClientProvider>
  )
}

export default Providers
