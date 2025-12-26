import { useItem } from '@/hooks/rules/useItem'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { ItemHeader } from '@/components/rules/items/ItemHeader'
import { ItemInfo } from '@/components/rules/items/ItemInfo'
import { ItemDescription } from '@/components/rules/items/ItemDescription'

function ItemSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Item() {
  const { itemIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useItem(itemIndex)

  if (isLoading) return <ItemSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <ErrorDisplay error="Item not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <ItemHeader item={data} />
      <Separator />
      <ItemInfo item={data} />
      <ItemDescription item={data} />
    </div>
  )
}

