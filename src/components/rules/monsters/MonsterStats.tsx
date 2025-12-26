import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdMonster } from '@/services/rules/monsters.service'

type MonsterStatsProps = {
  monster: SrdMonster
}

export function MonsterStats({ monster }: MonsterStatsProps) {
  const getModifier = (score: number) => {
    return Math.floor((score - 10) / 2)
  }

  const formatModifier = (modifier: number) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ability Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">STR</p>
            <p className="text-base">
              {monster.strength} ({formatModifier(getModifier(monster.strength))})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">DEX</p>
            <p className="text-base">
              {monster.dexterity} ({formatModifier(getModifier(monster.dexterity))})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">CON</p>
            <p className="text-base">
              {monster.constitution} ({formatModifier(getModifier(monster.constitution))})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">INT</p>
            <p className="text-base">
              {monster.intelligence} ({formatModifier(getModifier(monster.intelligence))})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">WIS</p>
            <p className="text-base">
              {monster.wisdom} ({formatModifier(getModifier(monster.wisdom))})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">CHA</p>
            <p className="text-base">
              {monster.charisma} ({formatModifier(getModifier(monster.charisma))})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

