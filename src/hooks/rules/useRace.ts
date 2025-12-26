import { useQuery } from '@tanstack/react-query'
import { racesQueries } from '@/queries/rules/races.queries'

export const useRace = (raceIndex: string) => {
  return useQuery({
    ...racesQueries.detail(raceIndex),
    enabled: !!raceIndex,
  })
}

