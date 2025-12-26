import { CardListSkeleton } from '@/components/characters/CardListSkeleton'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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
    return <CardListSkeleton />
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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Character Class</h1>
      <div className="grid grid-cols-2 gap-4">
        {classes.map(classData => (
          <Card
            key={classData.index}
            className={cn(
              'cursor-pointer hover:bg-muted',
              selectedClass === classData.index ? 'bg-muted border-primary' : ''
            )}
            onClick={() => handleClassClick(classData.index)}
          >
            <CardHeader>
              <CardTitle>{classData.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button onClick={handleNextClick} disabled={!selectedClass}>
        Next
      </Button>
    </div>
  )
}
