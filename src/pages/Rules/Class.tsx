import { useClass } from '@/hooks/rules/useClass'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { ClassHeader } from '@/components/rules/classes/ClassHeader'
import { ClassInfo } from '@/components/rules/classes/ClassInfo'
import { ClassDescription } from '@/components/rules/classes/ClassDescription'

function ClassSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Class() {
  const { classIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useClass(classIndex)

  if (isLoading) return <ClassSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <ErrorDisplay error="Class not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <ClassHeader classData={data} />
      <Separator />
      <ClassInfo classData={data} />
      <ClassDescription classData={data} />
    </div>
  )
}

