import { api } from '@/lib/api/api.client'
import { mapApiError } from '@/lib/api/api.errors'

type CharacterListItem = {
  id: string
  name: string
  level: number

  raceIndex: string | null
  classIndex: string | null

  createdAt: string
}

type Character = {
  id: string
  name: string
  level: number

  raceIndex: string | null
  subraceIndex: string | null

  classIndex: string | null
  subclassIndex: string | null

  backgroundIndex: string | null
  alignmentIndex: string | null

  abilityScores: AbilityScores

  skillIndexes: string[]
  proficiencyIndexes: string[]
  languageIndexes: string[]
  spellIndexes: string[]
  equipmentIndexes: string[]

  createdAt: string
  updatedAt: string
}

type AbilityScores = {
  strength: number | null
  dexterity: number | null
  constitution: number | null
  intelligence: number | null
  wisdom: number | null
  charisma: number | null
}

export async function getCharacters(): Promise<CharacterListItem[]> {
  try {
    const { data } = await api.get('/characters')
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}

export async function getCharacter(characterId: string): Promise<Character> {
  try {
    const { data } = await api.get(`/characters/${characterId}`)
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}

export async function createCharacter(name: string): Promise<Character> {
  try {
    const { data } = await api.post('/characters', { name })
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}
