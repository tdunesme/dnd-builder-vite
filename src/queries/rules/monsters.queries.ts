import { getMonsters, getMonster } from '@/services/rules/monsters.service'

export const monstersKeys = {
  all: ['monsters'] as const,
  lists: () => [...monstersKeys.all, 'list'] as const,
  detail: (index: string) => [...monstersKeys.all, 'detail', index] as const,
}

export const monstersQueries = {
  list: () => ({
    queryKey: monstersKeys.lists(),
    queryFn: getMonsters,
  }),

  detail: (index: string) => ({
    queryKey: monstersKeys.detail(index),
    queryFn: () => getMonster(index),
  }),
}

