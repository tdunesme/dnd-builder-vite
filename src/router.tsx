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
import { CharacterRaceStep } from '@/pages/character/CharacterRaceStep'
import { CharacterBackgroundStep } from '@/pages/character/CharacterBackgroundStep'
// Pages (UI only pour l’instant)
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { CharactersPage } from '@/pages/character/CharactersPage'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getMe } from './services/auth/auth.service'
import { queryClient } from './lib/query/queryClient'
import { ClassesPage } from './pages/Rules/Classes'
import { BackgroundsPage } from './pages/Rules/Backgrounds'
import { SpellsPage } from './pages/Rules/Spells'
import { MonstersPage } from './pages/Rules/Monsters'
import { ItemsPage } from './pages/Rules/Items'
import { FeatsPage } from './pages/Rules/Feats'
import { RacesPage } from './pages/Rules/Races'
import { Spell } from './pages/Rules/Spell'
import { Class } from './pages/Rules/Class'
import { Race } from './pages/Rules/Race'
import { Background } from './pages/Rules/Background'
import { Feat } from './pages/Rules/Feat'
import { Item } from './pages/Rules/Item'
import { Monster } from './pages/Rules/Monster'

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

const characterClassEditRoute = new Route({
  getParentRoute: () => builderRoute,
  path: '$characterId/class',
  component: CharacterClassStep,
})

const characterRaceEditRoute = new Route({
  getParentRoute: () => builderRoute,
  path: '$characterId/race',
  component: CharacterRaceStep,
})

const characterBackgroundEditRoute = new Route({
  getParentRoute: () => builderRoute,
  path: '$characterId/background',
  component: CharacterBackgroundStep,
})

/* Rules Routes */

const rulesRoute = new Route({
  getParentRoute: () => appRoute,
  path: 'rules',
  component: () => <Outlet />,
})

const classesRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'classes',
  component: ClassesPage,
})

const classRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'classes/$classIndex',
  component: Class,
})

const racesRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'races',
  component: RacesPage,
})

const raceRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'races/$raceIndex',
  component: Race,
})

const backgroundsRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'backgrounds',
  component: BackgroundsPage,
})

const backgroundRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'backgrounds/$backgroundIndex',
  component: Background,
})

const featsRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'feats',
  component: FeatsPage,
})

const featRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'feats/$featIndex',
  component: Feat,
})

const spellsRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'spells',
  component: SpellsPage,
})

const spellRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'spells/$spellIndex',
  component: Spell,
})

const itemsRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'items',
  component: ItemsPage,
})

const itemRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'items/$itemIndex',
  component: Item,
})

const monstersRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'monsters',
  component: MonstersPage,
})

const monsterRoute = new Route({
  getParentRoute: () => rulesRoute,
  path: 'monsters/$monsterIndex',
  component: Monster,
})

/* ------------------------------------------------------------ */

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute, signupRoute]),
  appRoute.addChildren([
    charactersRoute,
    builderRoute.addChildren([
      characterNameEditRoute,
      characterClassEditRoute,
      characterRaceEditRoute,
      characterBackgroundEditRoute,
    ]),
    rulesRoute.addChildren([
      classesRoute,
      classRoute,
      racesRoute,
      raceRoute,
      backgroundsRoute,
      backgroundRoute,
      featsRoute,
      featRoute,
      spellsRoute,
      spellRoute,
      itemsRoute,
      itemRoute,
      monstersRoute,
      monsterRoute,
    ]),
  ]),
])

export const router = new Router({ routeTree })
