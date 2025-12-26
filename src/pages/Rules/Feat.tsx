import { useFeat } from '@/hooks/rules/useFeat'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { FeatHeader } from '@/components/rules/feats/FeatHeader'
import { FeatInfo } from '@/components/rules/feats/FeatInfo'
import { FeatDescription } from '@/components/rules/feats/FeatDescription'

function FeatSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Feat() {
  const { featIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useFeat(featIndex)

  if (isLoading) return <FeatSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <ErrorDisplay error="Feat not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <FeatHeader feat={data} />
      <Separator />
      <FeatInfo feat={data} />
      <FeatDescription feat={data} />
    </div>
  )
}

