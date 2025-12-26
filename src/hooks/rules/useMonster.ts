import { useQuery } from '@tanstack/react-query'
import { monstersQueries } from '@/queries/rules/monsters.queries'

export const useMonster = (monsterIndex: string) => {
  return useQuery({
    ...monstersQueries.detail(monsterIndex),
    enabled: !!monsterIndex,
  })
}

