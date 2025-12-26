import { useBackgrounds } from '@/hooks/rules/useBackgrounds'
import { BackgroundsTable } from '@/components/rules/backgrounds/BackgroundsTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function BackgroundsPage() {
  const { data, isLoading, isError, error } = useBackgrounds()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No backgrounds found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Backgrounds</h1>
      <BackgroundsTable data={data} />
    </>
  )
}
