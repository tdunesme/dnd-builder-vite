import { useQuery } from '@tanstack/react-query'
import { raceQueries } from '@/queries/race.queries'

export function useRace(raceIndex: string) {
  return useQuery(raceQueries.detail(raceIndex))
}

