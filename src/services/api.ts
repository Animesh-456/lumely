import { products, categories, collections, type Product } from '../data/products'

// Simulated API delay
const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export interface ProductFilters {
  category?: string
  collection?: string
  metal?: string
  stoneType?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest'
  isNew?: boolean
}

export const api = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    await delay()
    let result = [...products]

    if (filters) {
      if (filters.category) result = result.filter(p => p.category === filters.category)
      if (filters.collection) result = result.filter(p => p.collection === filters.collection)
      if (filters.metal) result = result.filter(p => p.metal === filters.metal)
      if (filters.stoneType) result = result.filter(p => p.stoneType === filters.stoneType)
      if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice!)
      if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice!)
      if (filters.isNew) result = result.filter(p => p.isNew)
      if (filters.search) {
        const q = filters.search.toLowerCase()
        result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
      }
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break
          case 'price-asc': result.sort((a, b) => a.price - b.price); break
          case 'price-desc': result.sort((a, b) => b.price - a.price); break
          case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
        }
      }
    }

    return result
  },

  async getProduct(id: string): Promise<Product | undefined> {
    await delay()
    return products.find(p => p.id === id)
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay()
    return products.filter(p => p.isFeatured)
  },

  async getNewArrivals(): Promise<Product[]> {
    await delay()
    return products.filter(p => p.isNew)
  },

  async getCategories() {
    await delay()
    return categories
  },

  async getCollections() {
    await delay()
    return collections
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    await delay()
    const product = products.find(p => p.id === productId)
    if (!product) return []
    return products.filter(p => p.id !== productId && (p.category === product.category || p.collection === product.collection)).slice(0, 4)
  },

  async submitOrder(orderData: { items: any[]; retailer: any; total: number }): Promise<{ success: boolean; orderId: string }> {
    await delay(1000)
    // In production, this would send an email to the sales rep
    console.log('Order submitted — notification would be sent to sales representative:', orderData)
    return { success: true, orderId: 'ORD-' + Date.now().toString(36).toUpperCase() }
  },

  async submitContactForm(data: { name: string; email: string; company: string; message: string }): Promise<boolean> {
    await delay(800)
    console.log('Contact form submitted:', data)
    return true
  },
}
