import { PackagePlus } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NewProduct } from '../types'

type AddProductFormProps = {
  onSubmit: (product: NewProduct) => void
}

type Errors = Partial<Record<'title' | 'price' | 'image', string>>

const initialForm = { title: '', price: '', image: '', category: 'electronics', description: '' }

function AddProductForm({ onSubmit }: AddProductFormProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Errors>({})

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: Errors = {}
    if (!form.title.trim()) next.title = 'Product name is required.'
    if (!form.price || Number(form.price) <= 0) next.price = 'Enter a positive price.'
    try { new URL(form.image) } catch { next.image = 'Enter a valid image URL.' }
    setErrors(next)
    if (Object.keys(next).length) return
    onSubmit({ ...form, price: Number(form.price) })
  }

  const inputClass = 'mt-2 h-12 w-full rounded-sm border border-zinc-300 bg-transparent px-4 text-sm dark:border-zinc-700'

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <label className="text-sm font-medium">Product Name
        <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Wireless headphones" />
        {errors.title && <span className="mt-1 block text-xs text-red-500">{errors.title}</span>}
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Price
          <input className={inputClass} type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="99.99" />
          {errors.price && <span className="mt-1 block text-xs text-red-500">{errors.price}</span>}
        </label>
        <label className="text-sm font-medium">Category
          <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
          </select>
        </label>
      </div>
      <label className="text-sm font-medium">Image URL
        <input className={inputClass} type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/product.jpg" />
        {errors.image && <span className="mt-1 block text-xs text-red-500">{errors.image}</span>}
      </label>
      <label className="text-sm font-medium">Description
        <textarea className="mt-2 min-h-28 w-full resize-y rounded-sm border border-zinc-300 bg-transparent p-4 text-sm dark:border-zinc-700" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell customers about the product" />
      </label>
      <button className="mt-2 flex h-12 items-center justify-center gap-2 rounded-sm bg-violet-brand font-semibold text-white transition hover:bg-violet-deep" type="submit">
        <PackagePlus size={19} /> Add Product
      </button>
    </form>
  )
}

export default AddProductForm
