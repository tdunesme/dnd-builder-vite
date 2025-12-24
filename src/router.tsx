import {
  RootRoute,
  Route,
  Router,
  Outlet,
  redirect,
} from '@tanstack/react-router'

import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'

// Pages (UI only pour l’instant)
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { CharactersPage } from '@/pages/character/CharactersPage'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getMe } from './services/auth/auth.service'
import { queryClient } from './lib/query/queryClient'

const rootRoute = new RootRoute({
  component: () => (
    <div className="min-h-screen">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-6 text-red-500">
      <h2 className="font-semibold mb-2">Error</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  ),
  notFoundComponent: () => <div className="p-6">Page not found</div>,
})

/* Auth Routes */

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthLayout,
  beforeLoad: async () => {
    try {
      await queryClient.ensureQueryData({
        queryKey: ['me'],
        queryFn: getMe,
      })
      throw redirect({ to: '/characters' })
    } catch {
      return
    }
  },
})

const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'login',
  component: LoginPage,
})

const signupRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'signup',
  component: SignupPage,
})

/* App Routes */
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'index',
  beforeLoad: () => {
    throw redirect({
      to: '/characters',
    })
  },
})

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
  beforeLoad: async () => {
    try {
      await queryClient.ensureQueryData({
        queryKey: ['me'],
        queryFn: getMe,
      })
    } catch {
      throw redirect({ to: '/auth/login' })
    }
  },
})

const charactersRoute = new Route({
  getParentRoute: () => appRoute,
  path: 'characters',
  component: CharactersPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute, signupRoute]),
  appRoute.addChildren([charactersRoute]),
])

export const router = new Router({ routeTree })
