import { useMutation } from '@tanstack/react-query'
import { createCharacter } from '@/services/character/character.service'
import { queryClient } from '@/lib/query/queryClient'
import { characterKeys } from '@/queries/character.queries'

export function useCreateCharacter() {
  return useMutation({
    mutationFn: createCharacter,
    onSuccess: data => {
      console.log('Character created:', data)
      queryClient.setQueryData(characterKeys.detail(data.id), data)
      queryClient.invalidateQueries({
        queryKey: characterKeys.lists(),
      })
    },
  })
}
