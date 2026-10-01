import axios from 'axios'
import type { Product } from '../types'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

export async function getProducts() {
  const response = await api.get<Product[]>('/products')
  return response.data
}
