export function loadStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export function saveStored<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storageKeys = {
  products: 'vexora-products',
  cart: 'vexora-cart',
  theme: 'vexora-theme',
} as const
