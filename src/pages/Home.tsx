import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Award, HeartHandshake } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { categories, collections } from '../data/products'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [featured, setFeatured] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])

  useEffect(() => {
    api.getFeaturedProducts().then(setFeatured)
    api.getNewArrivals().then(setNewArrivals)
  }, [])

  return (
    <div className="page-home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&h=900&fit=crop)' }} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-tag">Established 1978</span>
          <h1>Exceptional Jewellery<br />for Exceptional Retailers</h1>
          <p>Trusted wholesale partner to independent jewellers across the United Kingdom. Premium collections, competitive trade pricing, and unrivalled service.</p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/catalogue" className="btn btn-primary btn-lg">Browse Catalogue <ArrowRight size={18} /></Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">Open Trade Account <ArrowRight size={18} /></Link>
                <Link to="/login" className="btn btn-outline btn-lg">Trade Login</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <Shield size={28} />
            <div>
              <strong>Trusted Supplier</strong>
              <span>Over 45 years in business</span>
            </div>
          </div>
          <div className="trust-item">
            <Truck size={28} />
            <div>
              <strong>UK-Wide Delivery</strong>
              <span>Insured & tracked shipping</span>
            </div>
          </div>
          <div className="trust-item">
            <Award size={28} />
            <div>
              <strong>Quality Assured</strong>
              <span>Hallmarked & certified</span>
            </div>
          </div>
          <div className="trust-item">
            <HeartHandshake size={28} />
            <div>
              <strong>Dedicated Support</strong>
              <span>Personal sales representative</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Browse by Type</span>
            <h2>Our Categories</h2>
            <p>From timeless rings to statement necklaces, explore our full range of wholesale jewellery.</p>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <Link to={isAuthenticated ? `/catalogue?category=${cat.id}` : '/login'} key={cat.id} className="category-card">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="category-card-overlay">
                  <h3>{cat.name}</h3>
                  <span>View Collection <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {isAuthenticated && featured.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Handpicked</span>
              <h2>Featured Products</h2>
              <p>Our most popular pieces, selected by our team of jewellery experts.</p>
            </div>
            <div className="product-grid">
              {featured.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="section-footer">
              <Link to="/catalogue" className="btn btn-outline">View All Products <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections Banner */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Curated for Retailers</span>
            <h2>Our Collections</h2>
            <p>Carefully curated collections designed to help you merchandise effectively.</p>
          </div>
          <div className="collections-grid">
            {collections.map(col => (
              <Link to={isAuthenticated ? `/catalogue?collection=${col.id}` : '/login'} key={col.id} className="collection-card">
                <img src={col.image} alt={col.name} loading="lazy" />
                <div className="collection-card-content">
                  <h3>{col.name}</h3>
                  <p>{col.description}</p>
                  <span className="collection-link">Explore <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {isAuthenticated && newArrivals.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Just Landed</span>
              <h2>New Arrivals</h2>
              <p>The latest additions to our wholesale catalogue.</p>
            </div>
            <div className="product-grid">
              {newArrivals.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="section-footer">
              <Link to="/new-arrivals" className="btn btn-outline">See All New Arrivals <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner (for non-authenticated users) */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="cta-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&h=600&fit=crop)' }} />
          <div className="cta-overlay" />
          <div className="container cta-content">
            <h2>Ready to Partner with Us?</h2>
            <p>Join hundreds of independent retailers who trust G&J Lumley for their wholesale jewellery needs. Open a trade account today and access our full catalogue with exclusive trade pricing.</p>
            <Link to="/register" className="btn btn-primary btn-lg">Apply for a Trade Account <ArrowRight size={18} /></Link>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="section">
        <div className="container">
          <div className="testimonial-block">
            <blockquote>
              "G&J Lumley has been our primary wholesale supplier for over fifteen years. Their quality is consistently excellent, and their dedicated sales team understands exactly what our customers want."
            </blockquote>
            <cite>— Margaret Hayes, Hayes Fine Jewellers, Chester</cite>
          </div>
        </div>
      </section>
    </div>
  )
}
