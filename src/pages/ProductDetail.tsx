import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Minus, Plus, Check, Package, RotateCcw, Shield } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setAdded(false)
    setQuantity(1)
    setSelectedImage(0)
    Promise.all([api.getProduct(id), api.getRelatedProducts(id)]).then(([p, r]) => {
      setProduct(p || null)
      setRelated(r)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>
  if (!product) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Product not found</h2><Link to="/catalogue" className="btn btn-outline" style={{ marginTop: '1rem' }}>Back to Catalogue</Link></div>

  const handleAddToOrder = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      metal: product.metal,
      sku: product.sku,
    }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="page-product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/catalogue">Catalogue</Link>
          <span>/</span>
          <Link to={`/catalogue?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.images.length > 1 && (
                <>
                  <button className="gallery-nav gallery-prev" onClick={() => setSelectedImage(i => i > 0 ? i - 1 : product.images.length - 1)}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="gallery-nav gallery-next" onClick={() => setSelectedImage(i => i < product.images.length - 1 ? i + 1 : 0)}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <div className="gallery-thumbs">
              {product.images.map((img, i) => (
                <button key={i} className={`gallery-thumb ${i === selectedImage ? 'active' : ''}`} onClick={() => setSelectedImage(i)}>
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            {product.isNew && <span className="product-badge badge-new">New Arrival</span>}
            <h1>{product.name}</h1>
            <p className="product-sku">SKU: {product.sku}</p>

            {isAuthenticated ? (
              <div className="product-price-block">
                <span className="product-price">£{product.price.toFixed(2)}</span>
                <span className="product-price-label">Trade Price (exc. VAT)</span>
              </div>
            ) : (
              <div className="product-price-block">
                <Link to="/login" className="btn btn-outline">Login for Trade Pricing</Link>
              </div>
            )}

            <p className="product-description">{product.longDescription}</p>

            <div className="product-specs">
              <div className="spec-row"><span>Metal</span><span>{product.metal}</span></div>
              <div className="spec-row"><span>Stone</span><span>{product.stoneType}</span></div>
              <div className="spec-row"><span>Weight</span><span>{product.weight}</span></div>
              <div className="spec-row"><span>Dimensions</span><span>{product.dimensions}</span></div>
              <div className="spec-row"><span>Min. Order</span><span>{product.minOrder} units</span></div>
              <div className="spec-row"><span>Availability</span><span className={product.inStock ? 'in-stock' : 'out-of-stock'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span></div>
            </div>

            {isAuthenticated && (
              <div className="product-actions">
                <div className="quantity-control">
                  <button onClick={() => setQuantity(q => Math.max(product.minOrder, q - 1))} disabled={quantity <= product.minOrder}><Minus size={16} /></button>
                  <input type="number" value={quantity} onChange={e => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))} min={product.minOrder} />
                  <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
                </div>
                <button className={`btn btn-primary btn-lg add-to-order ${added ? 'added' : ''}`} onClick={handleAddToOrder} disabled={!product.inStock}>
                  {added ? <><Check size={18} /> Added to Order</> : <><ShoppingBag size={18} /> Add to Order</>}
                </button>
                <button className="btn btn-icon" title="Save to wishlist"><Heart size={20} /></button>
              </div>
            )}

            <div className="product-features">
              <div className="feature"><Package size={18} /><span>Insured UK delivery</span></div>
              <div className="feature"><RotateCcw size={18} /><span>30-day returns policy</span></div>
              <div className="feature"><Shield size={18} /><span>Hallmarked & certified</span></div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="section related-section">
            <div className="section-header">
              <h2>You May Also Like</h2>
            </div>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
