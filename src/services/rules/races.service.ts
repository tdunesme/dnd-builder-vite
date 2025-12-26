import { srdApi } from '@/lib/api/srd-api.client'

export type SrdRaceListItem = {
  index: string
  name: string
  url: string
}

export type SrdRace = {
  index: string
  name: string
  speed: number
  ability_bonuses?: Array<{
    ability_score: {
      index: string
      name: string
      url: string
    }
    bonus: number
  }>
  alignment: string
  age: string
  size: string
  size_description: string
  starting_proficiencies?: Array<{
    index: string
    name: string
    url: string
  }>
  starting_proficiency_options?: {
    choose: number
    type: string
    from: {
      option_set_type: string
      options: Array<{
        option_type: string
        item?: {
          index: string
          name: string
          url: string
        }
      }>
    }
  }
  languages: Array<{
    index: string
    name: string
    url: string
  }>
  language_desc: string
  traits?: Array<{
    index: string
    name: string
    url: string
  }>
  subraces?: Array<{
    index: string
    name: string
    url: string
  }>
  url: string
}

export async function getRaces(): Promise<SrdRaceListItem[]> {
  const { data } = await srdApi.get('/races')
  return data.results
}

export async function getRace(index: string): Promise<SrdRace> {
  const { data } = await srdApi.get(`/races/${index}`)
  return data
}

