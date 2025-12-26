import { getFeats, getFeat } from '@/services/rules/feats.service'

export const featsKeys = {
  all: ['feats'] as const,
  lists: () => [...featsKeys.all, 'list'] as const,
  detail: (index: string) => [...featsKeys.all, 'detail', index] as const,
}

export const featsQueries = {
  list: () => ({
    queryKey: featsKeys.lists(),
    queryFn: getFeats,
  }),

  detail: (index: string) => ({
    queryKey: featsKeys.detail(index),
    queryFn: () => getFeat(index),
  }),
}

