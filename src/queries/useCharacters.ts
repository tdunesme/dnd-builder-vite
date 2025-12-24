import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createCharacter,
  getCharacter,
  getCharacters,
} from '@/services/character/character.service'

export function useCharacters() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })
}

export function useCharacter(characterId: string) {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter(characterId),
  })
}

export function useCreateCharacter() {
  return useMutation({
    mutationFn: createCharacter,
  })
}
