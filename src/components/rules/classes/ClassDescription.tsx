import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdClass } from '@/services/rules/classes.service'

type ClassDescriptionProps = {
  classData: SrdClass
}

export function ClassDescription({ classData }: ClassDescriptionProps) {
  return (
    <>
      {classData.subclasses && classData.subclasses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subclasses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {classData.subclasses.map(subclass => (
                <Badge key={subclass.index} variant="outline">
                  {subclass.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {classData.spellcasting && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spellcasting</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Spellcasting Ability
              </p>
              <p className="text-base">{classData.spellcasting.spellcasting_ability.name}</p>
            </div>
            {classData.spellcasting.info && classData.spellcasting.info.length > 0 && (
              <div className="flex flex-col gap-2">
                {classData.spellcasting.info.map((info, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {info.name}
                    </p>
                    <div className="flex flex-col gap-2">
                      {info.desc.map((desc, descIndex) => (
                        <p key={descIndex} className="text-base leading-relaxed">
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

