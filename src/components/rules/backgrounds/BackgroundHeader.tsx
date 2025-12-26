import type { SrdBackground } from '@/services/rules/backgrounds.service'

type BackgroundHeaderProps = {
  background: SrdBackground
}

export function BackgroundHeader({ background }: BackgroundHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {background.name}
          </h1>
        </div>
      </div>
    </div>
  )
}

