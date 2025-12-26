import { useRace } from '@/hooks/rules/useRace'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { RaceHeader } from '@/components/rules/races/RaceHeader'
import { RaceInfo } from '@/components/rules/races/RaceInfo'
import { RaceDescription } from '@/components/rules/races/RaceDescription'

function RaceSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Race() {
  const { raceIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useRace(raceIndex)

  if (isLoading) return <RaceSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <ErrorDisplay error="Race not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <RaceHeader race={data} />
      <Separator />
      <RaceInfo race={data} />
      <RaceDescription race={data} />
    </div>
  )
}

