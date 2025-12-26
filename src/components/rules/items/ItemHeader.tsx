import { Badge } from '@/components/ui/badge'
import type { SrdItem } from '@/services/rules/items.service'

type ItemHeaderProps = {
  item: SrdItem
}

export function ItemHeader({ item }: ItemHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            {item.equipment_category && (
              <Badge variant="default" className="text-sm px-3 py-1">
                {item.equipment_category.name}
              </Badge>
            )}
            {item.gear_category && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {item.gear_category.name}
              </Badge>
            )}
            {item.cost && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                {item.cost.quantity} {item.cost.unit}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

