import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { User, Package, Settings, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Account() {
  const { user } = useAuth()
  const { orders } = useCart()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile')

  if (!user) return null

  return (
    <div className="page-account">
      <div className="page-banner">
        <div className="container">
          <h1>My Account</h1>
          <p>Welcome back, {user.contactName}</p>
        </div>
      </div>

      <div className="container account-layout">
        <aside className="account-sidebar">
          <div className="account-user-card">
            <div className="account-avatar">{user.contactName.split(' ').map(n => n[0]).join('')}</div>
            <h3>{user.contactName}</h3>
            <p>{user.companyName}</p>
          </div>
          <nav className="account-nav">
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <User size={18} /> Profile Details
            </button>
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
              <Package size={18} /> Order History
            </button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <Settings size={18} /> Account Settings
            </button>
          </nav>
        </aside>

        <main className="account-main">
          {activeTab === 'profile' && (
            <div className="account-section">
              <h2>Profile Details</h2>
              <div className="profile-grid">
                <div className="profile-card">
                  <h4>Business Information</h4>
                  <div className="profile-row"><User size={16} /><div><label>Company Name</label><p>{user.companyName}</p></div></div>
                  <div className="profile-row"><User size={16} /><div><label>Contact Name</label><p>{user.contactName}</p></div></div>
                  <div className="profile-row"><Mail size={16} /><div><label>Email</label><p>{user.email}</p></div></div>
                  <div className="profile-row"><Phone size={16} /><div><label>Phone</label><p>{user.phone}</p></div></div>
                </div>
                <div className="profile-card">
                  <h4>Account Details</h4>
                  <div className="profile-row"><MapPin size={16} /><div><label>Address</label><p>{user.address}<br />{user.city}, {user.postcode}</p></div></div>
                  <div className="profile-row"><User size={16} /><div><label>Sales Representative</label><p>{user.salesRep}</p></div></div>
                  <div className="profile-row"><Calendar size={16} /><div><label>Member Since</label><p>{new Date(user.joinDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></div>
                  <div className="profile-row"><Settings size={16} /><div><label>Account Status</label><p className={`status-badge status-${user.accountStatus}`}>{user.accountStatus}</p></div></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="account-section">
              <h2>Order History</h2>
              {orders.length === 0 ? (
                <div className="empty-state-sm">
                  <Package size={36} />
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <h4>{order.id}</h4>
                          <p>{new Date(order.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <span className={`status-badge status-${order.status}`}>{order.status}</span>
                      </div>
                      <div className="order-card-items">
                        {order.items.map(item => (
                          <div key={item.productId} className="order-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                              <p className="order-item-name">{item.name}</p>
                              <p className="order-item-meta">x{item.quantity} · £{item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-card-footer">
                        <span>Total: £{order.total.toFixed(2)} exc. VAT</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="account-section">
              <h2>Account Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Email Notifications</label>
                  <label className="checkbox-label"><input type="checkbox" defaultChecked /> Order confirmations</label>
                  <label className="checkbox-label"><input type="checkbox" defaultChecked /> New product alerts</label>
                  <label className="checkbox-label"><input type="checkbox" /> Marketing communications</label>
                </div>
                <div className="form-group">
                  <label>Change Password</label>
                  <input type="password" placeholder="Current password" />
                  <input type="password" placeholder="New password" style={{ marginTop: '0.5rem' }} />
                  <input type="password" placeholder="Confirm new password" style={{ marginTop: '0.5rem' }} />
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
