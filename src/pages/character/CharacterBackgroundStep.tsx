import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ErrorDisplay } from '@/components/ui/error-display'
import { useCharacter } from '@/hooks/character/useCharacter'
import { backgroundQueries } from '@/queries/background.queries'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { router } from '@/router'
import { useUpdateCharacter } from '@/hooks/character/useUpdateCharacter'
import { Check, BookOpen } from 'lucide-react'
import { toast } from 'sonner'

export function CharacterBackgroundStep() {
  const {
    data: backgrounds,
    isLoading: isBackgroundsLoading,
    isError: isBackgroundsError,
    error: backgroundsError,
  } = useQuery(backgroundQueries.list())

  const updateCharacterMutation = useUpdateCharacter()

  const { characterId } = useParams({ strict: false })
  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    error: characterError,
  } = useCharacter(characterId)

  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    character?.backgroundIndex ?? null
  )

  const handleBackgroundClick = (backgroundIndex: string) => {
    setSelectedBackground(backgroundIndex)
  }

  const handleNextClick = () => {
    if (!selectedBackground || !character?.id) return

    updateCharacterMutation.mutate(
      {
        id: character.id,
        backgroundIndex: selectedBackground,
      },
      {
        onSuccess: () => {
          toast.success('Background updated successfully')
          router.navigate({
            to: '/builder/$characterId/race',
            params: { characterId },
          })
        },
        onError: () => {
          toast.error('Failed to update character background')
        },
      }
    )
  }

  if (isBackgroundsLoading || isCharacterLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-4xl space-y-6">
          <Skeleton className="h-12 w-64 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isBackgroundsError || !backgrounds) {
    return (
      <ErrorDisplay
        error={backgroundsError ?? 'Failed to load backgrounds'}
        title="Error loading backgrounds"
      />
    )
  }

  if (isCharacterError || !character) {
    return (
      <ErrorDisplay
        error={characterError ?? 'Failed to load character'}
        title="Error loading character"
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="size-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Background
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Select your character's background
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {backgrounds.map(backgroundData => {
            const isSelected = selectedBackground === backgroundData.index
            return (
              <Card
                key={backgroundData.index}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => handleBackgroundClick(backgroundData.index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {backgroundData.name}
                    </CardTitle>
                    {isSelected && (
                      <div className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground">
                        <Check className="size-4" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to select
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleNextClick}
            disabled={!selectedBackground}
            size="lg"
            className="min-w-[200px]"
          >
            {selectedBackground ? 'Continue' : 'Select a background'}
          </Button>
        </div>
      </div>
    </div>
  )
}
