import { Button } from '@/components/ui/button'
import { useCharacters } from '@/hooks/character/useCharacters'
import { useCreateCharacter } from '@/hooks/character/useCreateCharacter'
import { CardListSkeleton } from '@/components/characters/CardListSkeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { toast } from 'sonner'
import { router } from '@/router'
import type { Character } from '@/services/character/character.service'

export function CharactersPage() {
  const { data, isLoading, isError, error } = useCharacters()
  const createCharacterMutation = useCreateCharacter()

  const handleCharacterClick = (characterId: string) => {
    router.navigate({
      to: '/builder/$characterId/name',
      params: { characterId },
    })
  }

  const handleCreateCharacter = () => {
    createCharacterMutation.mutate(
      {
        name: 'New Character',
        level: 1,
      },
      {
        onSuccess: (data: Character) => {
          toast.success('Character created successfully')
          router.navigate({
            to: '/builder/$characterId/name',
            params: { characterId: data.id },
          })
        },
        onError: () => {
          toast.error('Failed to create character')
        },
      }
    )
  }

  if (isLoading) {
    return <CardListSkeleton count={6} />
  }

  if (isError) {
    return <ErrorDisplay error={error} />
  }

  if (!data || data.length === 0) {
    return <div>No characters found</div>
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Characters</h1>
        <Button onClick={handleCreateCharacter}>Create Character</Button>
      </div>
      <ul className="space-y-2">
        {data.map(character => (
          <li
            key={character.id}
            className="border rounded p-3 hover:bg-muted"
            onClick={() => handleCharacterClick(character.id)}
          >
            <div className="font-medium">{character.name}</div>
            <div className="text-sm text-muted-foreground">
              Level {character.level} — {character.classIndex}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
