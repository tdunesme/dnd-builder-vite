import {
  RootRoute,
  Route,
  Router,
  Outlet,
  redirect,
} from '@tanstack/react-router'

import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { CharacterNameStep } from '@/pages/character/CharacterNameStep'
import { CharacterClassStep } from '@/pages/character/CharacterClassStep'
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

/* Auth Routes */

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

/* App Layout Route */

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

/* Characters Routes */

const charactersRoute = new Route({
  getParentRoute: () => appRoute,
  path: 'characters',
  component: CharactersPage,
})

/* Character Builder Routes */

const builderRoute = new Route({
  getParentRoute: () => appRoute,
  path: 'builder',
  component: () => <Outlet />,
})

const characterNameEditRoute = new Route({
  getParentRoute: () => builderRoute,
  path: '$characterId/name',
  component: CharacterNameStep,
})

const characterNameCreateRoute = new Route({
  getParentRoute: () => builderRoute,
  path: 'name',
  component: CharacterNameStep,
})

const characterClassEditRoute = new Route({
  getParentRoute: () => builderRoute,
  path: '$characterId/class',
  component: CharacterClassStep,
})

/* ------------------------------------------------------------ */

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute, signupRoute]),
  appRoute.addChildren([
    charactersRoute,
    builderRoute.addChildren([
      characterNameEditRoute,
      characterNameCreateRoute,
      characterClassEditRoute,
    ]),
  ]),
])

export const router = new Router({ routeTree })
