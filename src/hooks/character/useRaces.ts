import { useQuery } from '@tanstack/react-query'
import { raceQueries } from '@/queries/race.queries'

export function useRaces() {
  return useQuery(raceQueries.list())
}

