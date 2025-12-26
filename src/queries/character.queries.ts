import {
  getCharacter,
  getCharacters,
} from '@/services/character/character.service'

export const characterKeys = {
  all: ['characters'],
  lists: () => [...characterKeys.all, 'list'],
  detail: (id: string) => [...characterKeys.all, 'detail', id],
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
