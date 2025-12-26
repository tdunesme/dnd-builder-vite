import { useSpell } from '@/hooks/rules/useSpell'
import { useParams } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/ui/error-display'
import { SpellHeader } from '@/components/rules/spells/SpellHeader'
import { SpellInfo } from '@/components/rules/spells/SpellInfo'
import { SpellDescription } from '@/components/rules/spells/SpellDescription'
import { SpellDamage } from '@/components/rules/spells/SpellDamage'
import { SpellClasses } from '@/components/rules/spells/SpellClasses'

function SpellSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

export function Spell() {
  const { spellIndex } = useParams({ strict: false })
  const { data, isLoading, error } = useSpell(spellIndex)

  if (isLoading) return <SpellSkeleton />
  if (error) return <ErrorDisplay error={error} />
  if (!data) return <ErrorDisplay error="Spell not found" title="Not Found" />

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <SpellHeader spell={data} />
      <Separator />
      <SpellInfo spell={data} />
      <SpellDescription spell={data} />
      {data.damage && <SpellDamage damage={data.damage} />}
      <SpellClasses spell={data} />
    </div>
  )
}
