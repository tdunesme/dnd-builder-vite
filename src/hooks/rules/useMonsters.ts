import { useQuery } from '@tanstack/react-query'
import { monstersQueries } from '@/queries/rules/monsters.queries'

export function useMonsters() {
  return useQuery(monstersQueries.list())
}

