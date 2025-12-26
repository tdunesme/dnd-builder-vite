import { api } from '@/lib/api/api.client'

export type Class = {
  index: string
  name: string
  url: string
}

export async function getClasses(): Promise<Class[]> {
  const { data } = await api.get('/classes')
  return data
}

export async function getClass(index: string): Promise<unknown> {
  const { data } = await api.get(`/classes/${index}`)
  return data
}
