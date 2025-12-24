import { createCharacter } from '@/services/character/character.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateCharacter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCharacter,
    onSuccess: character => {
      console.log('success')
      console.log(character)
      queryClient.setQueryData(['character', character.id], character)
    },
    onError: error => {
      console.log('error')
      console.log(error)
    },
  })
}
