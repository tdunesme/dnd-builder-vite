import { getRaces, getRace } from '@/services/rules/races.service'

export const racesKeys = {
  all: ['races'] as const,
  lists: () => [...racesKeys.all, 'list'] as const,
  detail: (index: string) => [...racesKeys.all, 'detail', index] as const,
}

export const racesQueries = {
  list: () => ({
    queryKey: racesKeys.lists(),
    queryFn: getRaces,
  }),

  detail: (index: string) => ({
    queryKey: racesKeys.detail(index),
    queryFn: () => getRace(index),
  }),
}

