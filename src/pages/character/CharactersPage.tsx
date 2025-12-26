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

  if (isError) {
    return <ErrorDisplay error={error} />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Characters</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your characters
          </p>
        </div>
        <Button onClick={handleCreateCharacter}>Create Character</Button>
      </div>
      {isLoading ? (
        <CardListSkeleton count={6} />
      ) : !data || data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No characters found</p>
            <Button onClick={handleCreateCharacter}>Create your first character</Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <ul className="space-y-2">
            {data.map(character => (
              <li
                key={character.id}
                className="border border-border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleCharacterClick(character.id)}
              >
                <div className="font-medium text-lg">{character.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Level {character.level} — {character.classIndex || 'No class'}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
