import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { items, updateQuantity, removeItem, cartTotal, submitOrder } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    const order = submitOrder()
    navigate('/order-confirmation', { state: { order } })
  }

  if (items.length === 0) {
    return (
      <div className="page-cart">
        <div className="container">
          <div className="empty-state">
            <ShoppingBag size={48} />
            <h2>Your Order is Empty</h2>
            <p>Browse our catalogue to find products for your store.</p>
            <Link to="/catalogue" className="btn btn-primary">Browse Catalogue</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-cart">
      <div className="page-banner">
        <div className="container">
          <h1>Order Summary</h1>
          <p>Review your selected items before submitting to your sales representative.</p>
        </div>
      </div>

      <div className="container cart-layout">
        <div className="cart-items">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
          </div>

          {items.map(item => (
            <div key={item.productId} className="cart-item">
              <div className="cart-item-product">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4><Link to={`/product/${item.productId}`}>{item.name}</Link></h4>
                  <p className="cart-item-meta">SKU: {item.sku} &middot; {item.metal}</p>
                </div>
              </div>
              <div className="cart-item-price">£{item.price.toFixed(2)}</div>
              <div className="cart-item-qty">
                <div className="quantity-control quantity-sm">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={14} /></button>
                  <input type="number" value={item.quantity} onChange={e => updateQuantity(item.productId, parseInt(e.target.value) || 1)} min={1} />
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <div className="cart-item-subtotal">£{(item.price * item.quantity).toFixed(2)}</div>
              <button className="cart-item-remove" onClick={() => removeItem(item.productId)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Details</h3>
          <div className="cart-summary-row">
            <span>Subtotal ({items.length} items)</span>
            <span>£{cartTotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>VAT (20%)</span>
            <span>£{(cartTotal * 0.2).toFixed(2)}</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Estimated Total</span>
            <span>£{(cartTotal * 1.2).toFixed(2)}</span>
          </div>

          <div className="cart-rep-info">
            <p><strong>Sales Representative:</strong></p>
            <p>{user?.salesRep}</p>
            <p className="cart-rep-note">Your order will be sent to your dedicated sales representative for processing.</p>
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleSubmit}>
            Submit Order <ArrowRight size={18} />
          </button>
          <Link to="/catalogue" className="btn btn-outline btn-full">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  )
}
