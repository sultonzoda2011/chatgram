import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/i18n'
import { ThemeProvider } from '@/lib/providers/theme-provider'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Toaster closeButton richColors />
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}

export default Providers
