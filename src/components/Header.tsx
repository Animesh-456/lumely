import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Globe, Heart, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <>
      <header className="sc-header">
        {/* ── Top row: Logo centered, icons right ── */}
        <div className="sc-header-main container">
          {/* Mobile hamburger */}
          <button
            className="sc-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo — absolute center on desktop */}
          <Link to="/" className="sc-logo" aria-label="G&J Lumley Home">
            <img src="/logo.jpg" alt="G&J Lumley" className="sc-logo-img" />
          </Link>

          {/* Right actions */}
          <div className="sc-header-actions">
            {/* Icon group: Search, Browse, Wishlist, User */}
            <button
              className="sc-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button className="sc-icon-btn" aria-label="Browse">
              <Globe size={18} />
            </button>
            <button className="sc-icon-btn" aria-label="Wishlist">
              <Heart size={18} />
            </button>
            {isAuthenticated ? (
              <Link to="/account" className="sc-icon-btn" aria-label="My Account">
                <User size={18} />
              </Link>
            ) : (
              <button className="sc-icon-btn" aria-label="Account">
                <User size={18} />
              </button>
            )}

            {/* Retailer Login / Account buttons */}
            {isAuthenticated ? (
              <>
                <Link to="/account" className="sc-retailer-btn">
                  My Account
                </Link>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="sc-retailer-btn sc-signout-btn"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="sc-retailer-btn"
              >
                Retailer Login
              </Link>
            )}
          </div>
        </div>

        {/* ── Nav row ── */}
        <nav className={`sc-nav ${mobileOpen ? 'sc-nav-open' : ''}`} aria-label="Main navigation">
          <div className="sc-nav-inner container">
            <Link to="/" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link to="/about" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Our World
            </Link>


            <Link to="/contact" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Connect With Us
            </Link>

            <Link to="/contact" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Our Collections
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/catalogue" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
                  Catalogue
                </Link>
                <Link to="/account" className="sc-nav-link sc-mobile-only" onClick={() => setMobileOpen(false)}>
                  My Account
                </Link>
                <button
                  className="sc-nav-link sc-mobile-only"
                  onClick={() => { logout(); setMobileOpen(false); navigate('/') }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="sc-nav-link sc-mobile-only" onClick={() => setMobileOpen(false)}>
                Retailer Login
              </Link>
            )}
          </div>
        </nav>

        {/* ── Search bar ── */}
        {searchOpen && (
          <div className="sc-search-bar">
            <div className="container">
              <form onSubmit={handleSearch} className="sc-search-form">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search collections, jewellery..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sc-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  )
}
