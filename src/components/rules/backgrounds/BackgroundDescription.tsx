import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdBackground } from '@/services/rules/backgrounds.service'

type BackgroundDescriptionProps = {
  background: SrdBackground
}

export function BackgroundDescription({
  background,
}: BackgroundDescriptionProps) {
  return (
    <>
      {background.feature && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Feature: {background.feature.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {background.feature.desc.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

