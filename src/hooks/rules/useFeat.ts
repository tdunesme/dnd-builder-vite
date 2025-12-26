import { useQuery } from '@tanstack/react-query'
import { featsQueries } from '@/queries/rules/feats.queries'

export const useFeat = (featIndex: string) => {
  return useQuery({
    ...featsQueries.detail(featIndex),
    enabled: !!featIndex,
  })
}

