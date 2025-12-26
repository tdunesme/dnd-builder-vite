import { api } from '@/lib/api/api.client'

export type Background = {
  index: string
  name: string
  url: string
}

export async function getBackgrounds(): Promise<Background[]> {
  const { data } = await api.get('/backgrounds')
  return data
}

export async function getBackground(index: string): Promise<unknown> {
  const { data } = await api.get(`/backgrounds/${index}`)
  return data
}
