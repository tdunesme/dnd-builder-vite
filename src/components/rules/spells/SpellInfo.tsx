import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getComponentIcon } from './spells.utils'
import type { SrdSpell } from '@/services/rules/spells.service'

type SpellInfoProps = {
  spell: SrdSpell
}

export function SpellInfo({ spell }: SpellInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Casting Time
            </p>
            <p className="text-base">{spell.casting_time}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Range</p>
            <p className="text-base">{spell.range}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Duration
            </p>
            <p className="text-base">{spell.duration}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Components</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Required Components
            </p>
            <div className="flex flex-wrap gap-2">
              {spell.components.map((component, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-base px-3 py-1"
                >
                  {getComponentIcon(component)} {component}
                </Badge>
              ))}
            </div>
          </div>
          {spell.material && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Material
                </p>
                <p className="text-base italic">{spell.material}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

