import { useMonsters } from '@/hooks/rules/useMonsters'
import { MonstersTable } from '@/components/rules/monsters/MonstersTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function MonstersPage() {
  const { data, isLoading, isError, error } = useMonsters()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No monsters found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Monsters</h1>
      <MonstersTable data={data} />
    </>
  )
}
