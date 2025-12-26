import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdFeat } from '@/services/rules/feats.service'

type FeatInfoProps = {
  feat: SrdFeat
}

export function FeatInfo({ feat }: FeatInfoProps) {
  return (
    <>
      {feat.prerequisites && feat.prerequisites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prerequisites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feat.prerequisites.map((prereq, index) => {
                if (prereq.ability_score) {
                  return (
                    <Badge key={index} variant="outline">
                      {prereq.ability_score.name}: {prereq.minimum_score}
                    </Badge>
                  )
                }
                if (prereq.feat) {
                  return (
                    <Badge key={index} variant="outline">
                      {prereq.feat}
                    </Badge>
                  )
                }
                return null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

