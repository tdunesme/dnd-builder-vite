import { getRace, getRaces } from '@/services/character/races.service'

export const raceKeys = {
  all: ['races'],
  lists: () => [...raceKeys.all, 'list'],
  detail: (index: string) => [...raceKeys.all, 'detail', index],
}

export const raceQueries = {
  list: () => ({
    queryKey: raceKeys.lists(),
    queryFn: getRaces,
  }),

  detail: (index: string) => ({
    queryKey: raceKeys.detail(index),
    queryFn: () => getRace(index),
  }),
}

