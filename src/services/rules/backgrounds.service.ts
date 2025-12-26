import { srdApi } from '@/lib/api/srd-api.client'

export type SrdBackgroundListItem = {
  index: string
  name: string
  url: string
}

export type SrdBackground = {
  index: string
  name: string
  starting_proficiencies?: Array<{
    index: string
    name: string
    url: string
  }>
  language_options?: {
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
  feature?: {
    name: string
    desc: string[]
  }
  personality_traits?: {
    choose: number
    type: string
    from: {
      option_set_type: string
      options: Array<{
        option_type: string
        string?: string
      }>
    }
  }
  ideals?: {
    choose: number
    type: string
    from: {
      option_set_type: string
      options: Array<{
        option_type: string
        desc?: string
        alignments?: Array<{
          index: string
          name: string
          url: string
        }>
      }>
    }
  }
  bonds?: {
    choose: number
    type: string
    from: {
      option_set_type: string
      options: Array<{
        option_type: string
        string?: string
      }>
    }
  }
  flaws?: {
    choose: number
    type: string
    from: {
      option_set_type: string
      options: Array<{
        option_type: string
        string?: string
      }>
    }
  }
  url: string
}

export async function getBackgrounds(): Promise<SrdBackgroundListItem[]> {
  const { data } = await srdApi.get('/backgrounds')
  return data.results
}

export async function getBackground(index: string): Promise<SrdBackground> {
  const { data } = await srdApi.get(`/backgrounds/${index}`)
  return data
}

