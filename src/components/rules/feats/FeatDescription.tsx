import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdFeat } from '@/services/rules/feats.service'

type FeatDescriptionProps = {
  feat: SrdFeat
}

export function FeatDescription({ feat }: FeatDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {feat.desc.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

