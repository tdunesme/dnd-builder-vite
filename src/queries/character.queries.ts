import {
  getCharacter,
  getCharacters,
} from '@/services/character/character.service'

export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  detail: (id: string) => [...characterKeys.all, 'detail', id] as const,
}

export const characterQueries = {
  list: () => ({
    queryKey: characterKeys.lists(),
    queryFn: getCharacters,
  }),

  detail: (id: string) => ({
    queryKey: characterKeys.detail(id),
    queryFn: () => getCharacter(id),
  }),
}
