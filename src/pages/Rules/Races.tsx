import { useRaces } from '@/hooks/rules/useRaces'
import { RacesTable } from '@/components/rules/races/RacesTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function RacesPage() {
  const { data, isLoading, isError, error } = useRaces()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No races found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Races</h1>
      <RacesTable data={data} />
    </>
  )
}
