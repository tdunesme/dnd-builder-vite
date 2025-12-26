import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from '@tanstack/react-router'
import { useCharacter } from '@/hooks/character/useCharacter'
import { useUpdateCharacter } from '@/hooks/character/useUpdateCharacter'
import { CardListSkeleton } from '@/components/characters/CardListSkeleton'
import { NameStepForm } from '@/components/characters/name/name-step-form'

export function CharacterNameStep() {
  const updateCharacterMutation = useUpdateCharacter()
  const { characterId } = useParams({ strict: false })
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useCharacter(characterId)

  if (isLoading) {
    return <CardListSkeleton count={6} />
  }

  if (isError || !character) {
    return (
      <div>Error: {(error as Error)?.message ?? 'Character not found'}</div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Character Name
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NameStepForm
            character={character}
            updateCharacterMutation={updateCharacterMutation}
          />
        </CardContent>
      </Card>
    </div>
  )
}
