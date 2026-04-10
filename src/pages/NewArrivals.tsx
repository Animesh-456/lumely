import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getNewArrivals().then(data => { setProducts(data); setLoading(false) })
  }, [])

  return (
    <div className="page-new-arrivals">
      <div className="page-banner page-banner-tall" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1600&h=600&fit=crop)' }}>
        <div className="page-banner-overlay" />
        <div className="container">
          <h1>New Arrivals</h1>
          <p>The latest additions to our wholesale catalogue, fresh for your store.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-screen"><div className="spinner" /></div>
          ) : (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
