import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@/queries/rules/items.queries'

export function useItems() {
  return useQuery(itemsQueries.list())
}

