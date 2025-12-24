import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/layout/theme-provider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query/queryClient.ts'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
