import { useClasses } from '@/hooks/rules/useClasses'
import { ClassesTable } from '@/components/rules/classes/ClassesTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'

export function ClassesPage() {
  const { data, isLoading, isError, error } = useClasses()

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  if (isError) return <ErrorDisplay error={error} />

  if (!data?.length) return <div>No classes found</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
      <ClassesTable data={data} />
    </>
  )
}
