import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdSpell } from '@/services/rules/spells.service'

type SpellDescriptionProps = {
  spell: SrdSpell
}

export function SpellDescription({ spell }: SpellDescriptionProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {spell.desc.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {spell.higher_level && spell.higher_level.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">At Higher Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {spell.higher_level.map((paragraph, index) => (
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

