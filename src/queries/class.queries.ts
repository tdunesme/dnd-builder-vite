import { getClass, getClasses } from '@/services/character/classes.service'

export const classKeys = {
  all: ['classes'],
  lists: () => [...classKeys.all, 'list'],
  detail: (index: string) => [...classKeys.all, 'detail', index],
}

export const classQueries = {
  list: () => ({
    queryKey: classKeys.lists(),
    queryFn: getClasses,
  }),

  detail: (index: string) => ({
    queryKey: classKeys.detail(index),
    queryFn: () => getClass(index),
  }),
}
