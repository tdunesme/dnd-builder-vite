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
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
