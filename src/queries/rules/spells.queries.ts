import { getSpells, getSpell } from '@/services/rules/spells.service'

export const spellsKeys = {
  all: ['spells'] as const,
  lists: () => [...spellsKeys.all, 'list'] as const,
  detail: (index: string) => [...spellsKeys.all, 'detail', index] as const,
}

export const spellsQueries = {
  list: () => ({
    queryKey: spellsKeys.lists(),
    queryFn: getSpells,
  }),

  detail: (index: string) => ({
    queryKey: spellsKeys.detail(index),
    queryFn: () => getSpell(index),
  }),
}
