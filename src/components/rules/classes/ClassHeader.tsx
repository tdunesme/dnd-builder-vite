import { Badge } from '@/components/ui/badge'
import type { SrdClass } from '@/services/rules/classes.service'

type ClassHeaderProps = {
  classData: SrdClass
}

export function ClassHeader({ classData }: ClassHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{classData.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-sm px-3 py-1">
              Hit Die: d{classData.hit_die}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

