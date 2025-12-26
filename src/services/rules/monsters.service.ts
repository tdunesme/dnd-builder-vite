import { srdApi } from '@/lib/api/srd-api.client'

export type SrdMonsterListItem = {
  index: string
  name: string
  url: string
}

export type SrdMonster = {
  index: string
  name: string
  size: string
  type: string
  subtype?: string
  alignment: string
  armor_class: Array<{
    type: string
    value: number
    desc?: string
  }>
  hit_points: number
  hit_dice: string
  hit_points_roll: string
  speed: {
    walk?: string
    swim?: string
    fly?: string
    climb?: string
    burrow?: string
  }
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  proficiencies?: Array<{
    proficiency: {
      index: string
      name: string
      url: string
    }
    value: number
  }>
  damage_vulnerabilities?: string[]
  damage_resistances?: string[]
  damage_immunities?: string[]
  condition_immunities?: Array<{
    index: string
    name: string
    url: string
  }>
  senses?: {
    blindsight?: string
    darkvision?: string
    passive_perception: number
    tremorsense?: string
    truesight?: string
  }
  languages?: string
  challenge_rating: number
  proficiency_bonus: number
  xp: number
  special_abilities?: Array<{
    name: string
    desc: string
    usage?: {
      type: string
      times?: number
      rest_types?: string[]
    }
  }>
  actions?: Array<{
    name: string
    desc: string
    attack_bonus?: number
    damage?: Array<{
      damage_dice?: string
      damage_type: {
        index: string
        name: string
        url: string
      }
    }>
    dc?: {
      dc_type: {
        index: string
        name: string
        url: string
      }
      dc_value: number
      success_type: string
    }
    usage?: {
      type: string
      times?: number
    }
  }>
  legendary_actions?: Array<{
    name: string
    desc: string
    attack_bonus?: number
    damage?: Array<{
      damage_dice?: string
      damage_type: {
        index: string
        name: string
        url: string
      }
    }>
  }>
  url: string
}

export async function getMonsters(): Promise<SrdMonsterListItem[]> {
  const { data } = await srdApi.get('/monsters')
  return data.results
}

export async function getMonster(index: string): Promise<SrdMonster> {
  const { data } = await srdApi.get(`/monsters/${index}`)
  return data
}

