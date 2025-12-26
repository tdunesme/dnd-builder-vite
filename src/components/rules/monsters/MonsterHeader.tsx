import { Badge } from '@/components/ui/badge'
import type { SrdMonster } from '@/services/rules/monsters.service'

type MonsterHeaderProps = {
  monster: SrdMonster
}

export function MonsterHeader({ monster }: MonsterHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{monster.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-sm px-3 py-1">
              {monster.size} {monster.type}
              {monster.subtype && ` (${monster.subtype})`}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              CR {monster.challenge_rating}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {monster.alignment}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

