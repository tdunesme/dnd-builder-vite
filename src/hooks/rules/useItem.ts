import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@/queries/rules/items.queries'

export const useItem = (itemIndex: string) => {
  return useQuery({
    ...itemsQueries.detail(itemIndex),
    enabled: !!itemIndex,
  })
}

