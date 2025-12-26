import { useBackground } from '@/hooks/rules/useBackground'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { BackgroundHeader } from '@/components/rules/backgrounds/BackgroundHeader'
import { BackgroundInfo } from '@/components/rules/backgrounds/BackgroundInfo'
import { BackgroundDescription } from '@/components/rules/backgrounds/BackgroundDescription'

function BackgroundSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Background() {
  const { backgroundIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useBackground(backgroundIndex)

  if (isLoading) return <BackgroundSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data)
    return <ErrorDisplay error="Background not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <BackgroundHeader background={data} />
      <Separator />
      <BackgroundInfo background={data} />
      <BackgroundDescription background={data} />
    </div>
  )
}

