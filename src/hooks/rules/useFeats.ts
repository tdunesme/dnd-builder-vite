import { useQuery } from '@tanstack/react-query'
import { featsQueries } from '@/queries/rules/feats.queries'

export function useFeats() {
  return useQuery(featsQueries.list())
}

