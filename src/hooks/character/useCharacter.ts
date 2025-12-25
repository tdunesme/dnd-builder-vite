import { useQuery } from '@tanstack/react-query'
import { characterQueries } from '@/queries/character.queries'

export function useCharacter(characterId: string) {
  return useQuery(characterQueries.detail(characterId))
}
