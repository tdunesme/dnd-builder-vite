import { useQuery } from '@tanstack/react-query'
import { backgroundQueries } from '@/queries/background.queries'

export function useBackgrounds() {
  return useQuery(backgroundQueries.list())
}

