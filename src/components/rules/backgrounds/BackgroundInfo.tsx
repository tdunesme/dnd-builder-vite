import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdBackground } from '@/services/rules/backgrounds.service'

type BackgroundInfoProps = {
  background: SrdBackground
}

export function BackgroundInfo({ background }: BackgroundInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {background.starting_proficiencies &&
        background.starting_proficiencies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Starting Proficiencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {background.starting_proficiencies.map(prof => (
                  <Badge key={prof.index} variant="outline">
                    {prof.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  )
}

