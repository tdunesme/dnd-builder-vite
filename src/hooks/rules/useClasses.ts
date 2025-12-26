import { useQuery } from '@tanstack/react-query'
import { classesQueries } from '@/queries/rules/classes.queries'

export function useClasses() {
  return useQuery(classesQueries.list())
}

