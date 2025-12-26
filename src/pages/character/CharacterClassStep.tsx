import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ErrorDisplay } from '@/components/ui/error-display'
import { useCharacter } from '@/hooks/character/useCharacter'
import { classQueries } from '@/queries/class.queries'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { router } from '@/router'
import { useUpdateCharacter } from '@/hooks/character/useUpdateCharacter'
import { Check, Shield } from 'lucide-react'

export function CharacterClassStep() {
  const {
    data: classes,
    isLoading: isClassesLoading,
    isError: isClassesError,
    error: classesError,
  } = useQuery(classQueries.list())

  const { mutate: updateCharacterMutation } = useUpdateCharacter()

  const { characterId } = useParams({ strict: false })
  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    error: characterError,
  } = useCharacter(characterId)

  const [selectedClass, setSelectedClass] = useState<string | null>(
    character?.classIndex ?? null
  )

  const handleClassClick = (classIndex: string) => {
    setSelectedClass(classIndex)
  }

  const handleNextClick = () => {
    if (!selectedClass) return

    updateCharacterMutation({
      id: character?.id,
      classIndex: selectedClass,
    })

    router.navigate({
      to: '/builder/$characterId/class',
      params: { characterId, classIndex: selectedClass },
    })
  }

  if (isClassesLoading || isCharacterLoading) {
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

  if (isClassesError || !classes) {
    return (
      <ErrorDisplay
        error={classesError ?? 'Failed to load classes'}
        title="Error loading classes"
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
            <Shield className="size-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Class
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Step 2 of 2 — Select your character's class
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map(classData => {
            const isSelected = selectedClass === classData.index
            return (
              <Card
                key={classData.index}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => handleClassClick(classData.index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {classData.name}
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
            disabled={!selectedClass}
            size="lg"
            className="min-w-[200px]"
          >
            {selectedClass ? 'Continue' : 'Select a class'}
          </Button>
        </div>
      </div>
    </div>
  )
}
