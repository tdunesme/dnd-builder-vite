import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdMonster } from '@/services/rules/monsters.service'

type MonsterInfoProps = {
  monster: SrdMonster
}

export function MonsterInfo({ monster }: MonsterInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Armor Class</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">
            {monster.armor_class[0]?.value}
            {monster.armor_class[0]?.type && ` (${monster.armor_class[0].type})`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hit Points</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">
            {monster.hit_points} ({monster.hit_dice})
          </p>
        </CardContent>
      </Card>

      {monster.speed && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {monster.speed.walk && <p className="text-base">Walk: {monster.speed.walk}</p>}
              {monster.speed.swim && <p className="text-base">Swim: {monster.speed.swim}</p>}
              {monster.speed.fly && <p className="text-base">Fly: {monster.speed.fly}</p>}
              {monster.speed.climb && <p className="text-base">Climb: {monster.speed.climb}</p>}
              {monster.speed.burrow && <p className="text-base">Burrow: {monster.speed.burrow}</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

