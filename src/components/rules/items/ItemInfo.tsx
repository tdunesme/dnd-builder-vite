import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdItem } from '@/services/rules/items.service'

type ItemInfoProps = {
  item: SrdItem
}

export function ItemInfo({ item }: ItemInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {item.properties && item.properties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {item.properties.map(prop => (
                <Badge key={prop.index} variant="outline">
                  {prop.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {item.damage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Damage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {item.damage.damage_dice && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Damage Dice
                </p>
                <p className="text-base">{item.damage.damage_dice}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Damage Type
              </p>
              <p className="text-base">{item.damage.damage_type.name}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {item.weight && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base">{item.weight} lbs</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

