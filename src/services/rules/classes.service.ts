import { srdApi } from '@/lib/api/srd-api.client'

export type SrdClassListItem = {
  index: string
  name: string
  url: string
}

export type SrdClass = {
  index: string
  name: string
  hit_die: number
  proficiency_choices?: Array<{
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
  }>
  proficiencies: Array<{
    index: string
    name: string
    url: string
  }>
  saving_throws: Array<{
    index: string
    name: string
    url: string
  }>
  starting_equipment?: Array<{
    equipment: {
      index: string
      name: string
      url: string
    }
    quantity?: number
  }>
  starting_equipment_options?: Array<{
    choose: number
    type: string
    from: {
      option_set_type: string
      equipment_category?: {
        index: string
        name: string
        url: string
      }
    }
  }>
  class_levels: string
  multi_classing?: {
    prerequisites?: Array<{
      ability_score: {
        index: string
        name: string
        url: string
      }
      minimum_score: number
    }>
    proficiencies_gained?: Array<{
      index: string
      name: string
      url: string
    }>
  }
  subclasses: Array<{
    index: string
    name: string
    url: string
  }>
  spellcasting?: {
    level: number
    spellcasting_ability: {
      index: string
      name: string
      url: string
    }
    info: Array<{
      name: string
      desc: string[]
    }>
  }
  url: string
}

export async function getClasses(): Promise<SrdClassListItem[]> {
  const { data } = await srdApi.get('/classes')
  return data.results
}

export async function getClass(index: string): Promise<SrdClass> {
  const { data } = await srdApi.get(`/classes/${index}`)
  return data
}

