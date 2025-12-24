import { api } from '@/lib/api/api.client'
import { mapApiError } from '@/lib/api/api.errors'

export type CharacterListItem = {
  id: string
  name: string
  level: number

  raceIndex: string | null
  classIndex: string | null

  createdAt: Date
}

export async function getCharacters(): Promise<CharacterListItem[]> {
  try {
    const { data } = await api.get('/characters')
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}
