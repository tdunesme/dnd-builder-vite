import { srdApi } from '@/lib/api/srd-api.client'

export type SrdFeatListItem = {
  index: string
  name: string
  url: string
}

export type SrdFeat = {
  index: string
  name: string
  prerequisites?: Array<{
    ability_score?: {
      index: string
      name: string
      url: string
    }
    minimum_score?: number
    feat?: string
  }>
  desc: string[]
  url: string
}

export async function getFeats(): Promise<SrdFeatListItem[]> {
  const { data } = await srdApi.get('/feats')
  return data.results
}

export async function getFeat(index: string): Promise<SrdFeat> {
  const { data } = await srdApi.get(`/feats/${index}`)
  return data
}

