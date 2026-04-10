import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react'
import { api, type ProductFilters } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { categories, metalTypes, stoneTypes } from '../data/products'

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || '',
    collection: searchParams.get('collection') || '',
    metal: searchParams.get('metal') || '',
    stoneType: searchParams.get('stone') || '',
    search: searchParams.get('search') || '',
    sortBy: 'name',
    minPrice: undefined,
    maxPrice: undefined,
  })

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || '',
      collection: searchParams.get('collection') || '',
      search: searchParams.get('search') || '',
    }))
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    const cleaned: ProductFilters = {}
    if (filters.category) cleaned.category = filters.category
    if (filters.collection) cleaned.collection = filters.collection
    if (filters.metal) cleaned.metal = filters.metal
    if (filters.stoneType) cleaned.stoneType = filters.stoneType
    if (filters.search) cleaned.search = filters.search
    if (filters.sortBy) cleaned.sortBy = filters.sortBy
    if (filters.minPrice) cleaned.minPrice = filters.minPrice
    if (filters.maxPrice) cleaned.maxPrice = filters.maxPrice

    api.getProducts(cleaned).then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [filters])

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ sortBy: 'name' })
    setSearchParams({})
  }

  const activeFilterCount = [filters.category, filters.collection, filters.metal, filters.stoneType, filters.search].filter(Boolean).length
    + (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0)

  const pageTitle = filters.collection
    ? filters.collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : filters.category
      ? categories.find(c => c.id === filters.category)?.name || 'Catalogue'
      : filters.search
        ? `Search: "${filters.search}"`
        : 'Full Catalogue'

  return (
    <div className="page-catalogue">
      <div className="page-banner">
        <div className="container">
          <h1>{pageTitle}</h1>
          <p>{products.length} products available</p>
        </div>
      </div>

      <div className="container catalogue-layout">
        {/* Sidebar Filters */}
        <aside className={`catalogue-sidebar ${filtersOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            {activeFilterCount > 0 && (
              <button className="clear-filters" onClick={clearFilters}>Clear all</button>
            )}
            <button className="sidebar-close" onClick={() => setFiltersOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <select value={filters.category || ''} onChange={e => updateFilter('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <h4>Metal Type</h4>
            <select value={filters.metal || ''} onChange={e => updateFilter('metal', e.target.value)}>
              <option value="">All Metals</option>
              {metalTypes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <h4>Stone Type</h4>
            <select value={filters.stoneType || ''} onChange={e => updateFilter('stoneType', e.target.value)}>
              <option value="">All Stones</option>
              {stoneTypes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input type="number" placeholder="Min £" value={filters.minPrice || ''} onChange={e => updateFilter('minPrice', e.target.value)} />
              <span>—</span>
              <input type="number" placeholder="Max £" value={filters.maxPrice || ''} onChange={e => updateFilter('maxPrice', e.target.value)} />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="catalogue-main">
          <div className="catalogue-toolbar">
            <button className="filter-toggle" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={18} /> Filters
              {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            </button>

            <div className="toolbar-right">
              <select className="sort-select" value={filters.sortBy} onChange={e => updateFilter('sortBy', e.target.value)}>
                <option value="name">Sort: A–Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="view-toggles">
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid3X3 size={18} /></button>
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-screen"><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className={`product-grid ${viewMode === 'list' ? 'product-list' : ''}`}>
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>

      {filtersOpen && <div className="overlay" onClick={() => setFiltersOpen(false)} />}
    </div>
  )
}
