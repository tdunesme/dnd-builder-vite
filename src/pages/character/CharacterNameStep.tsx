import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from '@tanstack/react-router'
import { useCharacter } from '@/hooks/character/useCharacter'
import { useUpdateCharacter } from '@/hooks/character/useUpdateCharacter'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { NameStepForm } from '@/components/characters/name/name-step-form'
import { Sparkles } from 'lucide-react'

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-lg space-y-6">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isError || !character) {
    return (
      <ErrorDisplay
        error={error ?? 'Character not found'}
        title={error ? 'Error' : 'Not Found'}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="size-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Create Your Character
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Step 1 of 2 — Give your character a name
          </p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              Character Name
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Choose a unique name for your character
            </p>
          </CardHeader>
          <CardContent>
            <NameStepForm
              character={character}
              updateCharacterMutation={updateCharacterMutation}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
