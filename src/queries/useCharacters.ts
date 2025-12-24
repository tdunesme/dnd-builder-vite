import { useQuery } from '@tanstack/react-query'
import { getCharacters } from '@/services/character/character.service'

export function useCharacters() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })
}
