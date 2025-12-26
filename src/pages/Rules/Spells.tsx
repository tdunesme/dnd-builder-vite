import { useSpells } from '@/hooks/rules/useSpells'
import { SpellsTable } from '@/components/rules/spells/SpellsTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function SpellsPage() {
  const { data, isLoading, isError, error } = useSpells()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No spells found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Spells</h1>
      <SpellsTable data={data} />
    </>
  )
}
