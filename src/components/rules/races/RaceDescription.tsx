import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdRace } from '@/services/rules/races.service'

type RaceDescriptionProps = {
  race: SrdRace
}

export function RaceDescription({ race }: RaceDescriptionProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Age</p>
            <p className="text-base">{race.age}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Size</p>
            <p className="text-base">{race.size_description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Alignment</p>
            <p className="text-base">{race.alignment}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Languages</p>
            <p className="text-base">{race.language_desc}</p>
          </div>
        </CardContent>
      </Card>

      {race.subraces && race.subraces.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subraces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {race.subraces.map(subrace => (
                <span key={subrace.index} className="text-base">
                  {subrace.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

