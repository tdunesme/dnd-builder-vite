import { srdApi } from '@/lib/api/srd-api.client'

export type SrdListItem = {
  index: string
  name: string
  level: number
  url: string
}

export type SrdSpell = {
  index: string
  name: string
  desc: string[]
  higher_level?: string[]
  range: string
  components: string[]
  material?: string
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  level: number
  attack_type?: string
  damage?: {
    damage_type: {
      index: string
      name: string
      url: string
    }
    damage_at_slot_level?: Record<string, string>
  }
  school: {
    index: string
    name: string
    url: string
  }
  classes: Array<{
    index: string
    name: string
    url: string
  }>
  subclasses?: Array<{
    index: string
    name: string
    url: string
  }>
  url: string
  updated_at?: string
}

export async function getSpells(): Promise<SrdListItem[]> {
  const { data } = await srdApi.get('/spells')
  return data.results
}

export async function getSpell(index: string): Promise<SrdSpell> {
  const { data } = await srdApi.get(`/spells/${index}`)
  return data
}
