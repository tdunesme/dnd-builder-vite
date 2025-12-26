import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { SrdSpell } from '@/services/rules/spells.service'

type SpellDamageProps = {
  damage: NonNullable<SrdSpell['damage']>
}

export function SpellDamage({ damage }: SpellDamageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Damage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Damage Type
          </p>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {damage.damage_type.name}
          </Badge>
        </div>
        {damage.damage_at_slot_level && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Damage at Slot Level
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(damage.damage_at_slot_level)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([level, damage]) => (
                    <div
                      key={level}
                      className="flex flex-col items-center p-3 rounded-lg border bg-muted/50"
                    >
                      <p className="text-xs text-muted-foreground">
                        Level {level}
                      </p>
                      <p className="text-lg font-semibold">{damage}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

