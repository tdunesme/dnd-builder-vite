import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdRace } from '@/services/rules/races.service'

type RaceInfoProps = {
  race: SrdRace
}

export function RaceInfo({ race }: RaceInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {race.ability_bonuses && race.ability_bonuses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ability Score Bonuses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {race.ability_bonuses.map((bonus, index) => (
                <Badge key={index} variant="outline">
                  {bonus.ability_score.name}: +{bonus.bonus}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {race.starting_proficiencies && race.starting_proficiencies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Starting Proficiencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {race.starting_proficiencies.map(prof => (
                <Badge key={prof.index} variant="secondary">
                  {prof.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {race.languages && race.languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {race.languages.map(lang => (
                <Badge key={lang.index} variant="outline">
                  {lang.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

