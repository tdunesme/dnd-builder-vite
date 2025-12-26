import { Badge } from '@/components/ui/badge'
import type { SrdRace } from '@/services/rules/races.service'

type RaceHeaderProps = {
  race: SrdRace
}

export function RaceHeader({ race }: RaceHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{race.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-sm px-3 py-1">
              {race.size}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Speed: {race.speed} ft
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

