import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SrdSpell } from '@/services/rules/spells.service'

type SpellClassesProps = {
  spell: SrdSpell
}

export function SpellClasses({ spell }: SpellClassesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {spell.classes.map(classItem => (
              <Badge key={classItem.index} variant="secondary">
                {classItem.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {spell.subclasses && spell.subclasses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subclasses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {spell.subclasses.map(subclass => (
                <Badge key={subclass.index} variant="outline">
                  {subclass.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

