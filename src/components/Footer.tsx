import React from 'react'
import { Link } from 'react-router-dom'
import { Camera, Globe, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="sc-footer">
      <div className="sc-footer-inner container">
        {/* Left: Logo + social */}
        <div className="sc-footer-brand">
          <Link to="/" className="sc-footer-logo">
            <span className="sc-footer-logo-text">G&J Lumley</span>
            <span className="sc-footer-logo-sub">Wholesale Jewellery</span>
          </Link>
          <p className="sc-footer-tagline">
            Trusted UK wholesale jewellery supplier since 1978.
          </p>
          <div className="sc-footer-social">
            <span className="sc-footer-follow">Follow us on:</span>
            <div className="sc-footer-social-icons">
              <a href="#" aria-label="Instagram" className="sc-social-link">
                <Camera size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="sc-social-link">
                <Globe size={16} />
              </a>
              <a href="#" aria-label="Pinterest" className="sc-social-link">
                <Share2 size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Navigation links */}
        <div className="sc-footer-links">
          <ul className="sc-footer-nav">
            <li><Link to="/about#shows" className="sc-footer-link">Upcoming Shows</Link></li>
            <li><Link to="/about#press" className="sc-footer-link">In the Press</Link></li>
            <li><Link to="/contact" className="sc-footer-link">Contact Us</Link></li>
            <li><Link to="/account" className="sc-footer-link">My Account</Link></li>
            <li>
              <Link to="/register" className="sc-footer-link sc-footer-signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="sc-footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} G&J Lumley Ltd. All rights reserved.</p>
          <div className="sc-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
