import { getBackgrounds, getBackground } from '@/services/rules/backgrounds.service'

export const backgroundsKeys = {
  all: ['backgrounds'] as const,
  lists: () => [...backgroundsKeys.all, 'list'] as const,
  detail: (index: string) => [...backgroundsKeys.all, 'detail', index] as const,
}

export const backgroundsQueries = {
  list: () => ({
    queryKey: backgroundsKeys.lists(),
    queryFn: getBackgrounds,
  }),

  detail: (index: string) => ({
    queryKey: backgroundsKeys.detail(index),
    queryFn: () => getBackground(index),
  }),
}

