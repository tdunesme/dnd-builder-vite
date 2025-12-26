import { useMonster } from '@/hooks/rules/useMonster'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { MonsterHeader } from '@/components/rules/monsters/MonsterHeader'
import { MonsterInfo } from '@/components/rules/monsters/MonsterInfo'
import { MonsterStats } from '@/components/rules/monsters/MonsterStats'
import { MonsterAbilities } from '@/components/rules/monsters/MonsterAbilities'

function MonsterSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Monster() {
  const { monsterIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useMonster(monsterIndex)

  if (isLoading) return <MonsterSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data)
    return <ErrorDisplay error="Monster not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <MonsterHeader monster={data} />
      <Separator />
      <MonsterInfo monster={data} />
      <MonsterStats monster={data} />
      <MonsterAbilities monster={data} />
    </div>
  )
}

