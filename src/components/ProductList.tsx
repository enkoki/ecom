import type { Product } from '../types'
import ProductCard from './ProductCard'

type ProductListProps = {
  products: Product[]
  onOpen: (id: number) => void
  onAddToCart: (product: Product) => void
}

function ProductList({ products, onOpen, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-zinc-500">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default ProductList
