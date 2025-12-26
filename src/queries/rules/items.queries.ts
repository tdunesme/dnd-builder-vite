import { getItems, getItem } from '@/services/rules/items.service'

export const itemsKeys = {
  all: ['items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  detail: (index: string) => [...itemsKeys.all, 'detail', index] as const,
}

export const itemsQueries = {
  list: () => ({
    queryKey: itemsKeys.lists(),
    queryFn: getItems,
  }),

  detail: (index: string) => ({
    queryKey: itemsKeys.detail(index),
    queryFn: () => getItem(index),
  }),
}

