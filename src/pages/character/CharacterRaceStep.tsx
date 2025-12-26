import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ErrorDisplay } from '@/components/ui/error-display'
import { useCharacter } from '@/hooks/character/useCharacter'
import { raceQueries } from '@/queries/race.queries'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { router } from '@/router'
import { useUpdateCharacter } from '@/hooks/character/useUpdateCharacter'
import { Check, Users } from 'lucide-react'
import { toast } from 'sonner'

export function CharacterRaceStep() {
  const {
    data: races,
    isLoading: isRacesLoading,
    isError: isRacesError,
    error: racesError,
  } = useQuery(raceQueries.list())

  const updateCharacterMutation = useUpdateCharacter()

  const { characterId } = useParams({ strict: false })
  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    error: characterError,
  } = useCharacter(characterId)

  const [selectedRace, setSelectedRace] = useState<string | null>(
    character?.raceIndex ?? null
  )

  const handleRaceClick = (raceIndex: string) => {
    setSelectedRace(raceIndex)
  }

  const handleNextClick = () => {
    if (!selectedRace || !character?.id) return

    updateCharacterMutation.mutate(
      {
        id: character.id,
        raceIndex: selectedRace,
      },
      {
        onSuccess: () => {
          toast.success('Race updated successfully')
          router.navigate({
            to: '/characters',
          })
        },
        onError: () => {
          toast.error('Failed to update character race')
        },
      }
    )
  }

  if (isRacesLoading || isCharacterLoading) {
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

  if (isRacesError || !races) {
    return (
      <ErrorDisplay
        error={racesError ?? 'Failed to load races'}
        title="Error loading races"
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
            <Users className="size-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Race
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Select your character's race
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {races.map(raceData => {
            const isSelected = selectedRace === raceData.index
            return (
              <Card
                key={raceData.index}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => handleRaceClick(raceData.index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {raceData.name}
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
            disabled={!selectedRace}
            size="lg"
            className="min-w-[200px]"
          >
            {selectedRace ? 'Continue' : 'Select a race'}
          </Button>
        </div>
      </div>
    </div>
  )
}

