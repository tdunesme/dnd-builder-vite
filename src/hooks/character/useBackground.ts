import { useQuery } from '@tanstack/react-query'
import { backgroundQueries } from '@/queries/background.queries'

export function useBackground(backgroundIndex: string) {
  return useQuery(backgroundQueries.detail(backgroundIndex))
}

