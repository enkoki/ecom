export type Product = {
  id: number
  title: string
  price: number
  image: string
  category: string
  description?: string
  rating: { rate: number; count?: number }
  isCustom?: boolean
}

export type NewProduct = Pick<Product, 'title' | 'price' | 'image' | 'category' | 'description'>

export type CartItem = {
  product: Product
  quantity: number
}
