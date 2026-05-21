import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, User, Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <span>Wholesale enquiries: +44 (0)121 236 4478</span>
          <span>Trusted UK Jewellery Wholesaler Since 1978</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="logo">
            <span className="logo-text">G&J Lumley</span>
            <span className="logo-sub">Wholesale Jewellery</span>
          </Link>

          <nav className={`main-nav ${mobileOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Collections <ChevronDown size={14} />
              </button>
              <div className="nav-dropdown-menu">
                <Link to="/collections" onClick={() => setMobileOpen(false)}>All Collections</Link>
                <Link to="/catalogue?collection=eternal-classics" onClick={() => setMobileOpen(false)}>Eternal Classics</Link>
                <Link to="/catalogue?collection=modern-elegance" onClick={() => setMobileOpen(false)}>Modern Elegance</Link>
                <Link to="/catalogue?collection=heritage" onClick={() => setMobileOpen(false)}>Heritage</Link>
                <Link to="/catalogue?collection=bridal" onClick={() => setMobileOpen(false)}>Bridal</Link>
              </div>
            </div>
            <Link to="/catalogue" onClick={() => setMobileOpen(false)}>Catalogue</Link>
            <Link to="/new-arrivals" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          </nav>

          <div className="header-actions">
            {isAuthenticated && (
              <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                <Search size={20} />
              </button>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
                <div className="user-menu-wrapper">
                  <button className="icon-btn" onClick={() => setUserMenuOpen(!userMenuOpen)} aria-label="Account">
                    <User size={20} />
                  </button>
                  {userMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-dropdown-header">
                        <p className="user-dropdown-name">{user?.contactName}</p>
                        <p className="user-dropdown-company">{user?.companyName}</p>
                      </div>
                      <Link to="/account" onClick={() => setUserMenuOpen(false)}>My Account</Link>
                      <Link to="/account?tab=orders" onClick={() => setUserMenuOpen(false)}>Order History</Link>
                      <button onClick={() => { logout(); setUserMenuOpen(false); navigate('/') }}>
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary">Trade Login</Link>
            )}
          </div>
        </div>

        {searchOpen && (
          <div className="search-bar">
            <div className="container">
              <form onSubmit={handleSearch} className="search-form">
                <Search size={20} />
                <input type="text" placeholder="Search products, collections..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus />
                <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}
    </>
  )
}
