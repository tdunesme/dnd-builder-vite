import { useQuery } from '@tanstack/react-query'
import { racesQueries } from '@/queries/rules/races.queries'

export function useRaces() {
  return useQuery(racesQueries.list())
}

