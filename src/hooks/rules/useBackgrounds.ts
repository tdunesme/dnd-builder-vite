import { useQuery } from '@tanstack/react-query'
import { backgroundsQueries } from '@/queries/rules/backgrounds.queries'

export function useBackgrounds() {
  return useQuery(backgroundsQueries.list())
}

