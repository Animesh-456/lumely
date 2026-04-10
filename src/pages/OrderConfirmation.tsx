import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Mail, Phone, ArrowRight } from 'lucide-react'
import type { Order } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function OrderConfirmation() {
  const location = useLocation()
  const { user } = useAuth()
  const order = (location.state as { order: Order })?.order

  if (!order) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No order found</h2>
        <Link to="/catalogue" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Catalogue</Link>
      </div>
    )
  }

  return (
    <div className="page-confirmation">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Order Submitted Successfully</h1>
          <p className="confirmation-ref">Order Reference: <strong>{order.id}</strong></p>
          <p className="confirmation-text">
            Your order has been submitted and your dedicated sales representative, <strong>{user?.salesRep}</strong>,
            has been notified. They will review your order and be in touch shortly to confirm details and arrange delivery.
          </p>

          <div className="confirmation-summary">
            <h3>Order Summary</h3>
            <div className="confirmation-items">
              {order.items.map(item => (
                <div key={item.productId} className="confirmation-item">
                  <img src={item.image} alt={item.name} />
                  <div className="confirmation-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.sku} &middot; {item.metal}</p>
                  </div>
                  <div className="confirmation-item-qty">x{item.quantity}</div>
                  <div className="confirmation-item-price">£{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="confirmation-total">
              <span>Total (exc. VAT)</span>
              <span>£{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="confirmation-contact">
            <p>Have questions about your order?</p>
            <div className="confirmation-contact-methods">
              <a href="mailto:trade@lumleyjewellery.co.uk"><Mail size={16} /> trade@lumleyjewellery.co.uk</a>
              <a href="tel:+441212364478"><Phone size={16} /> +44 (0)121 236 4478</a>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/catalogue" className="btn btn-primary">Continue Shopping <ArrowRight size={16} /></Link>
            <Link to="/account?tab=orders" className="btn btn-outline">View Order History</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
