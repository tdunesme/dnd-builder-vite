import { srdApi } from '@/lib/api/srd-api.client'

export type SrdItemListItem = {
  index: string
  name: string
  url: string
}

export type SrdItem = {
  index: string
  name: string
  equipment_category?: {
    index: string
    name: string
    url: string
  }
  gear_category?: {
    index: string
    name: string
    url: string
  }
  cost?: {
    quantity: number
    unit: string
  }
  weight?: number
  desc?: string[]
  properties?: Array<{
    index: string
    name: string
    url: string
  }>
  weapon_category?: string
  weapon_range?: string
  category_range?: string
  damage?: {
    damage_dice?: string
    damage_type: {
      index: string
      name: string
      url: string
    }
  }
  range?: {
    normal?: number
    long?: number
  }
  throw_range?: {
    normal?: number
    long?: number
  }
  two_handed_damage?: {
    damage_dice?: string
    damage_type: {
      index: string
      name: string
      url: string
    }
  }
  special?: string[]
  armor_category?: string
  armor_class?: {
    base?: number
    dex_bonus?: boolean
    max_bonus?: number
  }
  str_minimum?: number
  stealth_disadvantage?: boolean
  tool_category?: string
  vehicle_category?: string
  speed?: {
    quantity: number
    unit: string
  }
  capacity?: string
  contents?: Array<{
    item: {
      index: string
      name: string
      url: string
    }
    quantity?: number
  }>
  url: string
}

export async function getItems(): Promise<SrdItemListItem[]> {
  const { data } = await srdApi.get('/equipment')
  return data.results
}

export async function getItem(index: string): Promise<SrdItem> {
  const { data } = await srdApi.get(`/equipment/${index}`)
  return data
}

