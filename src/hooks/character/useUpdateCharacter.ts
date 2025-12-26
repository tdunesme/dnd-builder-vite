import { queryClient } from '@/lib/query/queryClient'
import { characterKeys } from '@/queries/character.queries'
import { updateCharacter } from '@/services/character/character.service'
import { useMutation } from '@tanstack/react-query'
import type { Character } from '@/services/character/character.service'

export function useUpdateCharacter() {
  return useMutation({
    mutationFn: updateCharacter,
    onSuccess: (data: Character) => {
      queryClient.setQueryData(characterKeys.detail(data.id), data)
      queryClient.invalidateQueries({
        queryKey: characterKeys.lists(),
      })
    },
  })
}
