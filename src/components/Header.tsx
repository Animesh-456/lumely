import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Globe, Heart, User, Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [worldOpen, setWorldOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const worldRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (worldRef.current && !worldRef.current.contains(e.target as Node)) setWorldOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  const ourWorldLinks = [
    { label: 'Brand Write Up', href: '/about#brand' },
    { label: 'Craftsmanship', href: '/about#craftsmanship' },
    { label: 'The Lumley Advantage', href: '/about#advantage' },
    { label: 'Retailer Experience', href: '/about#retailer' },
    { label: 'Personal Service', href: '/about#service' },
  ]

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
            <button
              className="sc-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button className="sc-icon-btn" aria-label="Region">
              <Globe size={18} />
            </button>
            <button className="sc-icon-btn" aria-label="Wishlist">
              <Heart size={18} />
            </button>

            {isAuthenticated ? (
              <div className="sc-user-wrapper" ref={userRef}>
                <button
                  className="sc-icon-btn"
                  onClick={() => setUserOpen(!userOpen)}
                  aria-label="Account"
                >
                  <User size={18} />
                </button>
                {userOpen && (
                  <div className="sc-user-dropdown">
                    <div className="sc-user-header">
                      <p className="sc-user-name">{user?.contactName}</p>
                      <p className="sc-user-company">{user?.companyName}</p>
                    </div>
                    <Link to="/account" onClick={() => setUserOpen(false)}>My Account</Link>
                    <Link to="/catalogue" onClick={() => setUserOpen(false)}>Catalogue</Link>
                    <Link to="/account?tab=orders" onClick={() => setUserOpen(false)}>Order History</Link>
                    <button onClick={() => { logout(); setUserOpen(false); navigate('/') }}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="sc-icon-btn" aria-label="Account">
                <User size={18} />
              </button>
            )}

            <Link
              to="/login"
              className="sc-retailer-btn"
            >
              Retailer Login
            </Link>
          </div>
        </div>

        {/* ── Nav row ── */}
        <nav className={`sc-nav ${mobileOpen ? 'sc-nav-open' : ''}`} aria-label="Main navigation">
          <div className="sc-nav-inner container">
            <Link to="/" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            {/* OUR WORLD dropdown */}
            <div className="sc-nav-dropdown" ref={worldRef}>
              <button
                className={`sc-nav-link sc-nav-trigger ${worldOpen ? 'active' : ''}`}
                onClick={() => setWorldOpen(!worldOpen)}
                aria-expanded={worldOpen}
              >
                Our World <ChevronDown size={13} className={`sc-chevron ${worldOpen ? 'rotated' : ''}`} />
              </button>
              {worldOpen && (
                <div className="sc-dropdown-menu">
                  {ourWorldLinks.map(l => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="sc-dropdown-item"
                      onClick={() => { setWorldOpen(false); setMobileOpen(false) }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>


            <Link to="/contact" className="sc-nav-link" onClick={() => setMobileOpen(false)}>
              Connect With Us
            </Link>
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
