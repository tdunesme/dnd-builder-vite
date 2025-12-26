import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SrdItem } from '@/services/rules/items.service'

type ItemDescriptionProps = {
  item: SrdItem
}

export function ItemDescription({ item }: ItemDescriptionProps) {
  return (
    <>
      {item.desc && item.desc.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {item.desc.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {item.special && item.special.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Special</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {item.special.map((special, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {special}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

