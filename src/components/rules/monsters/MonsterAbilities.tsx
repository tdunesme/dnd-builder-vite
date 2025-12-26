import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdMonster } from '@/services/rules/monsters.service'

type MonsterAbilitiesProps = {
  monster: SrdMonster
}

export function MonsterAbilities({ monster }: MonsterAbilitiesProps) {
  return (
    <>
      {monster.special_abilities && monster.special_abilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Special Abilities</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {monster.special_abilities.map((ability, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base mb-2">{ability.name}</h3>
                <p className="text-base leading-relaxed">{ability.desc}</p>
                {ability.usage && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {ability.usage.type === 'per day' &&
                      `${ability.usage.times}/day`}
                    {ability.usage.type === 'recharge on roll' &&
                      `Recharge ${ability.usage.rest_types?.join(' or ')}`}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {monster.actions && monster.actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {monster.actions.map((action, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base mb-2">{action.name}</h3>
                <p className="text-base leading-relaxed">{action.desc}</p>
                {action.attack_bonus && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Attack Bonus: +{action.attack_bonus}
                  </p>
                )}
                {action.damage && action.damage.length > 0 && (
                  <div className="mt-2">
                    {action.damage.map((dmg, dmgIndex) => (
                      <p key={dmgIndex} className="text-sm text-muted-foreground">
                        {dmg.damage_dice} {dmg.damage_type.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {monster.legendary_actions && monster.legendary_actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Legendary Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {monster.legendary_actions.map((action, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base mb-2">{action.name}</h3>
                <p className="text-base leading-relaxed">{action.desc}</p>
                {action.attack_bonus && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Attack Bonus: +{action.attack_bonus}
                  </p>
                )}
                {action.damage && action.damage.length > 0 && (
                  <div className="mt-2">
                    {action.damage.map((dmg, dmgIndex) => (
                      <p key={dmgIndex} className="text-sm text-muted-foreground">
                        {dmg.damage_dice} {dmg.damage_type.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}

