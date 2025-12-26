import { Badge } from '@/components/ui/badge'
import { getLevelLabel } from './spells.utils'
import type { SrdSpell } from '@/services/rules/spells.service'

type SpellHeaderProps = {
  spell: SrdSpell
}

export function SpellHeader({ spell }: SpellHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{spell.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-sm px-3 py-1">
              {getLevelLabel(spell.level)}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {spell.school.name}
            </Badge>
            {spell.concentration && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                Concentration
              </Badge>
            )}
            {spell.ritual && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                Ritual
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

