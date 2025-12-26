import { getClasses, getClass } from '@/services/rules/classes.service'

export const classesKeys = {
  all: ['classes'] as const,
  lists: () => [...classesKeys.all, 'list'] as const,
  detail: (index: string) => [...classesKeys.all, 'detail', index] as const,
}

export const classesQueries = {
  list: () => ({
    queryKey: classesKeys.lists(),
    queryFn: getClasses,
  }),

  detail: (index: string) => ({
    queryKey: classesKeys.detail(index),
    queryFn: () => getClass(index),
  }),
}

