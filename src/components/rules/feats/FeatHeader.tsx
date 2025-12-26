import type { SrdFeat } from '@/services/rules/feats.service'

type FeatHeaderProps = {
  feat: SrdFeat
}

export function FeatHeader({ feat }: FeatHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{feat.name}</h1>
        </div>
      </div>
    </div>
  )
}

