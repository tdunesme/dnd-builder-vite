import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { getMe } from '@/services/auth/auth.service'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'

export function AppLayout() {
  useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  })
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
