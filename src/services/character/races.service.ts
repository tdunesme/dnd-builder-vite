import { api } from '@/lib/api/api.client'

export type Race = {
  index: string
  name: string
  url: string
}

export async function getRaces(): Promise<Race[]> {
  const { data } = await api.get('/races')
  return data
}

export async function getRace(index: string): Promise<unknown> {
  const { data } = await api.get(`/races/${index}`)
  return data
}
