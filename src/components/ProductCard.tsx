import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import type { Product } from '../data/products'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      metal: product.metal,
      sku: product.sku,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.isNew && <span className="product-badge badge-new">New</span>}
        <div className="product-card-actions">
          <button className="product-action-btn" title="Quick view">
            <Eye size={18} />
          </button>
          {isAuthenticated && (
            <button className="product-action-btn" title="Add to order" onClick={handleAddToCart}>
              <ShoppingBag size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="product-card-info">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-metal">{product.metal}</p>
        {isAuthenticated ? (
          <p className="product-card-price">£{product.price.toFixed(2)}</p>
        ) : (
          <p className="product-card-login">Login for trade pricing</p>
        )}
      </div>
    </Link>
  )
}
