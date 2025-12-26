import { useFeats } from '@/hooks/rules/useFeats'
import { FeatsTable } from '@/components/rules/feats/FeatsTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function FeatsPage() {
  const { data, isLoading, isError, error } = useFeats()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No feats found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Feats</h1>
      <FeatsTable data={data} />
    </>
  )
}
