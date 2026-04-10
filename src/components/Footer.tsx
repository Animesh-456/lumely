import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Globe, Camera, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <h3 className="footer-logo">G&J Lumley</h3>
            <p>Trusted UK wholesale jewellery supplier since 1978. Providing independent retailers with quality pieces, competitive trade pricing, and dependable service.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><Globe size={20} /></a>
              <a href="#" aria-label="Instagram"><Camera size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Briefcase size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalogue">Catalogue</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Trade Information</h4>
            <ul>
              <li><Link to="/register">Open a Trade Account</Link></li>
              <li><Link to="/login">Trade Login</Link></li>
              <li><Link to="/about">Our Heritage</Link></li>
              <li><a href="#">Delivery Information</a></li>
              <li><a href="#">Returns Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={16} />
                <span>G&J Lumley Ltd<br />Jewellery Quarter<br />Birmingham, B1 3DE</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+44 (0)121 236 4478</span>
              </li>
              <li>
                <Mail size={16} />
                <span>trade@lumleyjewellery.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} G&J Lumley Ltd. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
