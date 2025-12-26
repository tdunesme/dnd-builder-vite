import { useQuery } from '@tanstack/react-query'
import { backgroundsQueries } from '@/queries/rules/backgrounds.queries'

export const useBackground = (backgroundIndex: string) => {
  return useQuery({
    ...backgroundsQueries.detail(backgroundIndex),
    enabled: !!backgroundIndex,
  })
}

