import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { SrdClass } from '@/services/rules/classes.service'

type ClassInfoProps = {
  classData: SrdClass
}

export function ClassInfo({ classData }: ClassInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Saving Throws</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {classData.saving_throws.map(savingThrow => (
              <Badge key={savingThrow.index} variant="outline">
                {savingThrow.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {classData.proficiencies && classData.proficiencies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Proficiencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {classData.proficiencies.map(prof => (
                <Badge key={prof.index} variant="secondary">
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

