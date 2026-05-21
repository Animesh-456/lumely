import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { categories, collections } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

/* ── Hero Slider ──────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&h=1000&fit=crop&q=90',
    label: 'Eternal Classics',
  },
  {
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&h=1000&fit=crop&q=90',
    label: 'Modern Elegance',
  },
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&h=1000&fit=crop&q=90',
    label: 'Heritage Collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=1000&fit=crop&q=90',
    label: 'Bridal Collection',
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (idx: number) => {
    if (animating || idx === current) return
    setAnimating(true)
    setPrev(current)
    setCurrent(idx)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 900)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % HERO_SLIDES.length
        setPrev(c)
        setAnimating(true)
        setTimeout(() => {
          setPrev(null)
          setAnimating(false)
        }, 900)
        return next
      })
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <section className="sc-hero">
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`sc-hero-slide ${i === current ? 'sc-hero-slide-active' : ''} ${i === prev ? 'sc-hero-slide-prev' : ''}`}
          aria-hidden={i !== current}
        >
          <img src={slide.image} alt={slide.label} />
        </div>
      ))}

      {/* Subtle overlay */}
      <div className="sc-hero-overlay" />

      {/* Hero text — bottom left like Shy Creation */}
      <div className="sc-hero-content container">
        <p className="sc-hero-label">{HERO_SLIDES[current].label}</p>
        <h1 className="sc-hero-heading">
          Exceptional<br />
          <em>Jewellery</em><br />
          for Retailers
        </h1>
        <Link to="/collections" className="sc-hero-cta">
          Explore Now <ArrowRight size={16} />
        </Link>
      </div>

      {/* Dot navigation */}
      <div className="sc-hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`sc-hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

/* ── Upcoming Shows data ──────────────────────────────────────────────── */
const SHOWS = [
  { name: 'International Jewellery London', date: 'Sept 1–3, 2025', location: 'Excel London' },
  { name: 'Spring Fair Birmingham', date: 'Feb 2–5, 2026', location: 'NEC Birmingham' },
  { name: 'Goldsmiths Fair', date: 'Oct 3–12, 2025', location: 'Goldsmiths Centre, London' },
]

/* ─────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    api.getFeaturedProducts().then(setFeatured)
  }, [])

  /* ── Scroll-triggered reveals ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sc-reveal').forEach((el, i) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.sc-stagger-item').forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [featured])

  return (
    <div className="sc-page-home">

      {/* ── 1. HERO BANNER (4 images auto-scroll) ───────────────────── */}
      <HeroSlider />

      {/* ── 2. BRAND INTRO ──────────────────────────────────────────── */}
      <section className="sc-brand-intro">
        <div className="container">
          <div className="sc-brand-intro-inner sc-reveal">
            <span className="sc-eyebrow">Est. 1978 · Birmingham, UK</span>
            <h2 className="sc-brand-intro-heading">
              Fine Wholesale Jewellery,<br />
              <em>Crafted for Retailers</em>
            </h2>
            <p className="sc-brand-intro-text">
              G&amp;J Lumley has supplied independent jewellers across the United Kingdom
              for over four decades. From hallmarked gold rings to certified diamond pendants,
              every piece in our collection is chosen for quality, value, and enduring style.
            </p>
            <Link to="/about" className="sc-text-link">
              Discover Our Story <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. ICONIC CREATIONS ────────────────────────────────────── */}
      <section className="sc-iconic">
        <div className="container">
          <div className="sc-section-head sc-reveal">
            <span className="sc-eyebrow">Handpicked</span>
            <h2 className="sc-section-title">Iconic Creations</h2>
            <div className="sc-section-rule" />
          </div>

          {isAuthenticated && featured.length > 0 ? (
            <>
              <div className="sc-product-grid">
                {featured.slice(0, 8).map((p, i) => (
                  <div key={p.id} className="sc-stagger-item">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              <div className="sc-section-action sc-reveal">
                <Link to="/catalogue" className="sc-btn-outline">
                  View Full Catalogue <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <div className="sc-iconic-locked sc-reveal">
              <div className="sc-product-grid sc-product-grid-blur">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="sc-stagger-item sc-product-placeholder">
                    <div className="sc-placeholder-img" />
                    <div className="sc-placeholder-line" />
                    <div className="sc-placeholder-line sc-placeholder-line-sm" />
                  </div>
                ))}
              </div>
              <div className="sc-locked-overlay">
                <p>Trade account required to view pricing</p>
                <Link to="/login" className="sc-btn-primary">
                  Retailer Login <ArrowRight size={16} />
                </Link>
                <Link to="/register" className="sc-text-link" style={{ marginTop: '0.75rem' }}>
                  Apply for Trade Account <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. FULL BANNER (important collection) ──────────────────── */}
      <section className="sc-full-banner">
        <div className="sc-full-banner-img">
          <img
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1920&h=700&fit=crop&q=90"
            alt="Bridal Collection"
            loading="lazy"
          />
        </div>
        <div className="sc-full-banner-overlay" />
        <div className="sc-full-banner-content container">
          <div className="sc-reveal">
            <span className="sc-eyebrow" style={{ color: '#d4a843' }}>Featured Collection</span>
            <h2 className="sc-full-banner-heading">Bridal Collection</h2>
            <p className="sc-full-banner-sub">
              Exquisite pieces for the most special day. Ethically sourced, hallmarked, and delivered with care.
            </p>
            <Link
              to={isAuthenticated ? '/catalogue?collection=bridal' : '/login'}
              className="sc-btn-primary"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. SHOP BY CATEGORY / CRAFTSMANSHIP ────────────────────── */}
      <section className="sc-categories">
        <div className="container">
          <div className="sc-section-head sc-reveal">
            <span className="sc-eyebrow">Browse Our Range</span>
            <h2 className="sc-section-title">Shop by Category</h2>
            <div className="sc-section-rule" />
          </div>

          <div className="sc-cat-grid">
            {categories.map((cat, i) => (
              <Link
                to={isAuthenticated ? `/catalogue?category=${cat.id}` : '/login'}
                key={cat.id}
                className="sc-cat-card sc-stagger-item"
              >
                <div className="sc-cat-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="sc-cat-label">
                  <span>{cat.name}</span>
                  <ArrowUpRight size={14} className="sc-cat-arrow" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. UPCOMING SHOWS / EVENTS ─────────────────────────────── */}
      <section className="sc-shows">
        <div className="container">
          <div className="sc-section-head sc-reveal">
            <span className="sc-eyebrow">Find Us In Person</span>
            <h2 className="sc-section-title">Upcoming Shows &amp; Events</h2>
            <div className="sc-section-rule" />
          </div>

          <div className="sc-shows-list">
            {SHOWS.map((show, i) => (
              <div className="sc-show-item sc-reveal" key={i}>
                <div className="sc-show-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="sc-show-info">
                  <h3 className="sc-show-name">{show.name}</h3>
                  <p className="sc-show-meta">{show.date} &nbsp;·&nbsp; {show.location}</p>
                </div>
                <Link to="/contact" className="sc-show-cta">
                  Book Appointment <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
