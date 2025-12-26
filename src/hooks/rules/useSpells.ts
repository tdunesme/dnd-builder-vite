import { useQuery } from '@tanstack/react-query'
import { spellsQueries } from '@/queries/rules/spells.queries'

export function useSpells() {
  return useQuery(spellsQueries.list())
}
