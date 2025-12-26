import { useQuery } from '@tanstack/react-query'
import { spellsQueries } from '@/queries/rules/spells.queries'

export const useSpell = (spellIndex: string) => {
  return useQuery({
    ...spellsQueries.detail(spellIndex),
    enabled: !!spellIndex,
  })
}
