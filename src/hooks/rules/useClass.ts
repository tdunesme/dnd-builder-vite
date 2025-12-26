import { useQuery } from '@tanstack/react-query'
import { classesQueries } from '@/queries/rules/classes.queries'

export const useClass = (classIndex: string) => {
  return useQuery({
    ...classesQueries.detail(classIndex),
    enabled: !!classIndex,
  })
}

