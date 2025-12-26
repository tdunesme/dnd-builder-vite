import { useItems } from '@/hooks/rules/useItems'
import { ItemsTable } from '@/components/rules/items/ItemsTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function ItemsPage() {
  const { data, isLoading, isError, error } = useItems()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No items found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <ItemsTable data={data} />
    </>
  )
}
