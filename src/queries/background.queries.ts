import { getBackground, getBackgrounds } from '@/services/character/backgrounds.services'

export const backgroundKeys = {
  all: ['backgrounds'],
  lists: () => [...backgroundKeys.all, 'list'],
  detail: (index: string) => [...backgroundKeys.all, 'detail', index],
}

export const backgroundQueries = {
  list: () => ({
    queryKey: backgroundKeys.lists(),
    queryFn: getBackgrounds,
  }),

  detail: (index: string) => ({
    queryKey: backgroundKeys.detail(index),
    queryFn: () => getBackground(index),
  }),
}

