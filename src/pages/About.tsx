import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function About() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="page-about">
      <div className="page-banner page-banner-tall" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&h=600&fit=crop)' }}>
        <div className="page-banner-overlay" />
        <div className="container">
          <h1>Our Story</h1>
          <p>Over four decades of craftsmanship, trust, and partnership.</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-intro">
          <div className="about-intro-text">
            <span className="section-tag">Since 1978</span>
            <h2>A Heritage of Excellence</h2>
            <p>
              G&J Lumley was founded in 1978 in the heart of Birmingham's Jewellery Quarter — the historic centre
              of British jewellery manufacturing. What began as a small family operation has grown into one of the
              UK's most trusted wholesale jewellery suppliers, serving hundreds of independent retailers across
              the country.
            </p>
            <p>
              For over 45 years, our commitment to quality, fair pricing, and personal service has remained
              unchanged. We believe that the best business relationships are built on trust, and we work tirelessly
              to ensure our retail partners receive the finest products and support.
            </p>
          </div>
          <div className="about-intro-image">
            <img src="https://images.unsplash.com/photo-1515562141589-67f0d27a20db?w=600&h=700&fit=crop" alt="Jewellery craftsmanship" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="values-grid">
            <div className="value-card">
              <Award size={32} />
              <h3>Quality Assured</h3>
              <p>Every piece in our collection is hallmarked and certified to the highest UK standards. We work only with trusted manufacturers who share our commitment to excellence.</p>
            </div>
            <div className="value-card">
              <Users size={32} />
              <h3>Personal Service</h3>
              <p>Each retailer is assigned a dedicated sales representative who understands your business, your customers, and your local market.</p>
            </div>
            <div className="value-card">
              <Globe size={32} />
              <h3>UK-Wide Coverage</h3>
              <p>From the Scottish Highlands to the Channel Islands, we deliver to independent retailers across the United Kingdom with fully insured shipping.</p>
            </div>
            <div className="value-card">
              <Heart size={32} />
              <h3>Family Values</h3>
              <p>Now in our second generation of family ownership, we bring the same passion and personal touch that George and Janet Lumley established over four decades ago.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div className="about-story-image">
            <img src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=400&fit=crop" alt="Birmingham Jewellery Quarter" />
          </div>
          <div className="about-story-text">
            <h2>Rooted in the Jewellery Quarter</h2>
            <p>
              Birmingham's Jewellery Quarter has been the beating heart of British jewellery manufacturing since the
              18th century. As one of the quarter's established wholesale businesses, G&J Lumley is proud to be part
              of this rich heritage.
            </p>
            <p>
              Our premises in the heart of the quarter give us direct access to the finest craftspeople, stone setters,
              and finishers in the UK — ensuring that every piece we supply meets the exacting standards our retailers expect.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">45+</span>
              <span className="stat-label">Years in Business</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Retail Partners</span>
            </div>
            <div className="stat">
              <span className="stat-number">2,000+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">UK Hallmarked</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
          <h2>Ready to Partner with Us?</h2>
          <p style={{ marginBottom: '2rem' }}>Whether you're a new retailer looking to stock quality jewellery or an established shop seeking a reliable wholesale partner, we'd love to hear from you.</p>
          {isAuthenticated ? (
            <Link to="/catalogue" className="btn btn-primary btn-lg">Browse Our Catalogue <ArrowRight size={18} /></Link>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary btn-lg">Open a Trade Account <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Get in Touch</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
