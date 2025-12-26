// src/lib/api/srd-api-client.ts
import axios from 'axios'

export const srdApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/2014',
})
