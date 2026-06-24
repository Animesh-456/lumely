import React from 'react'
import { Link } from 'react-router-dom'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const Instagram = ({ size = 16, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const Facebook = ({ size = 16, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Linkedin = ({ size = 16, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="sc-footer">
      <div className="sc-footer-inner container">
        {/* Logo */}
        <Link to="/" className="sc-footer-logo" aria-label="G&J Lumley Home">
          <img src="/logo-footer.png" alt="G&J Lumley" className="sc-footer-logo-img" />
        </Link>

        {/* Tagline */}
        <p className="sc-footer-tagline">
          Trusted UK wholesale jewellery supplier since 1954.
        </p>

        {/* Horizontal Navigation Links */}
        <div className="sc-footer-nav-row">
          <a
            href="https://www.thejewelleryshow.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="sc-footer-link"
          >
            Upcoming Shows
          </a><span className="sc-footer-divider">|</span>

          <Link to="/contact" className="sc-footer-link">Contact Us</Link>
          <span className="sc-footer-divider">|</span>
          <Link to="/account" className="sc-footer-link">My Account</Link>
          <span className="sc-footer-divider">|</span>
          <Link to="/register" className="sc-footer-link sc-footer-signup">
            Sign Up
          </Link>
        </div>

        {/* Social Icons */}
        <div className="sc-footer-social">
          <div className="sc-footer-social-icons">
            <a href="#" aria-label="Instagram" className="sc-social-link">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="sc-social-link">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="sc-social-link">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="sc-footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} G&J Lumley Ltd. All rights reserved. &nbsp; Designed & Developed by <a href="https://www.jhunsinfobay.com" target="_blank" rel="noopener noreferrer">Jhuns Infobay</a></p>

        </div>
      </div>
    </footer>
  )
}
