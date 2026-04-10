import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { collections } from '../data/products'
import { useAuth } from '../context/AuthContext'

export default function Collections() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="page-collections">
      <div className="page-banner page-banner-tall" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&h=600&fit=crop)' }}>
        <div className="page-banner-overlay" />
        <div className="container">
          <h1>Our Collections</h1>
          <p>Carefully curated ranges designed to help you merchandise effectively and delight your customers.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="collections-page-grid">
            {collections.map((col, i) => (
              <div key={col.id} className={`collection-feature ${i % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="collection-feature-image">
                  <img src={col.image} alt={col.name} loading="lazy" />
                </div>
                <div className="collection-feature-content">
                  <span className="section-tag">Collection</span>
                  <h2>{col.name}</h2>
                  <p>{col.description}</p>
                  <p className="collection-feature-desc">
                    Explore our {col.name.toLowerCase()} range, featuring exquisite pieces crafted with the finest
                    materials and attention to detail. Each item in this collection has been selected to complement
                    your retail offering and appeal to discerning customers.
                  </p>
                  <Link to={isAuthenticated ? `/catalogue?collection=${col.id}` : '/login'} className="btn btn-primary">
                    View Collection <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
