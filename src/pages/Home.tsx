import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { categories, collections } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

/* ── Marquee ticker ──────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'Wholesale Jewellery',
  'Hallmarked & Certified',
  'UK-Wide Delivery',
  'Est. 1978',
  'Premium Trade Pricing',
  'Over 1,000 Pieces',
  'Independent Retailers',
  'Diamond & Gold',
]

function Marquee() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!track.current) return
    const items = Array.from(track.current.children)
    const total = items.length / 2 // cloned
    const width = (track.current.scrollWidth / 2)

    gsap.to(track.current, {
      x: -width,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="marquee-strip">
      <div className="marquee-track" ref={track}>
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">
            {t} <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Animated counter ─────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: to,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix
      },
    })
    return () => { tween.kill() }
  }, [to, suffix])

  return <span ref={ref}>0{suffix}</span>
}

/* ─────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [featured, setFeatured] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])

  // Refs for GSAP
  const heroRef = useRef<HTMLElement>(null)
  const heroTagRef = useRef<HTMLSpanElement>(null)
  const heroH1Ref = useRef<HTMLHeadingElement>(null)
  const heroParaRef = useRef<HTMLParagraphElement>(null)
  const heroActionsRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    api.getFeaturedProducts().then(setFeatured)
    api.getNewArrivals().then(setNewArrivals)
  }, [])

  /* ── Hero entrance ─────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(heroImgRef.current, { scale: 1.12, duration: 1.6, ease: 'power2.out' })
        .from(heroTagRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=1.0')
        .from(heroH1Ref.current, { y: 60, opacity: 0, duration: 0.9 }, '-=0.5')
        .from(heroParaRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(heroActionsRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── Scroll-triggered reveals ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // Category cards stagger
      gsap.utils.toArray<HTMLElement>('.cat-card-anim').forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      // Collection cards
      gsap.utils.toArray<HTMLElement>('.col-card-anim').forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // Product cards
      gsap.utils.toArray<HTMLElement>('.prod-card-anim').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: (i % 4) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })

      // CTA line animation
      gsap.utils.toArray<HTMLElement>('.cta-line').forEach((el, i) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1,
          delay: i * 0.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })

    return () => ctx.revert()
  }, [featured, newArrivals])

  return (
    <div className="page-home-v2">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="hero-v2" ref={heroRef}>
        {/* Background image with Ken Burns */}
        <div className="hero-v2-bg" ref={heroImgRef}>
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1800&h=1000&fit=crop&q=90"
            alt="Luxury jewellery"
          />
        </div>
        <div className="hero-v2-overlay" />

        <div className="hero-v2-body container">
          <div className="hero-v2-left">
            <span className="hero-v2-tag" ref={heroTagRef}>
              <Star size={10} fill="currentColor" /> Est. 1978 &nbsp;·&nbsp; UK Wholesale
            </span>
            <h1 className="hero-v2-heading" ref={heroH1Ref}>
              Exceptional<br />
              <em>Jewellery</em><br />
              for Retailers
            </h1>
            <p className="hero-v2-sub" ref={heroParaRef}>
              Trusted wholesale partner to independent jewellers across the United Kingdom.
              Premium collections, competitive trade pricing, and unrivalled service.
            </p>
            <div className="hero-v2-actions" ref={heroActionsRef}>
              {isAuthenticated ? (
                <Link to="/catalogue" className="btn-hero-primary">
                  Browse Catalogue <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-hero-primary">
                    Open Trade Account <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="btn-hero-ghost">
                    Trade Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="hero-v2-stats">
            {[
              { val: 45, suffix: '+', label: 'Years in Business' },
              { val: 1000, suffix: '+', label: 'SKUs Available' },
              { val: 500, suffix: '+', label: 'Active Retailers' },
            ].map((s, i) => (
              <div className="hero-stat-card" key={i}>
                <span className="hero-stat-number">
                  <Counter to={s.val} suffix={s.suffix} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <Marquee />

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="section-v2">
        <div className="container">
          <div className="section-v2-header reveal-up">
            <span className="section-v2-tag">Browse by Type</span>
            <h2 className="section-v2-title">Our Categories</h2>
            <div className="section-v2-line" />
          </div>

          <div className="cat-grid-v2">
            {categories.map((cat, i) => (
              <Link
                to={isAuthenticated ? `/catalogue?category=${cat.id}` : '/login'}
                key={cat.id}
                className="cat-card-v2 cat-card-anim"
              >
                <div className="cat-card-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="cat-card-body">
                  <h3>{cat.name}</h3>
                  <span className="cat-card-link">
                    Shop <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ──────────────────────────────────────── */}
      <section className="editorial-banner">
        <div className="eb-image">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=700&fit=crop&q=85"
            alt="Crafted with precision"
            loading="lazy"
          />
        </div>
        <div className="eb-content reveal-up">
          <span className="section-v2-tag">Our Philosophy</span>
          <h2>Crafted with<br /><em>Precision &amp; Heart</em></h2>
          <p>
            Every piece in our catalogue is sourced from trusted makers who share our
            commitment to quality, ethics, and enduring style. From hallmarked gold to
            certified diamonds — trade with confidence.
          </p>
          <Link to={isAuthenticated ? '/catalogue' : '/register'} className="btn-editorial">
            Explore the Range <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      {isAuthenticated && featured.length > 0 && (
        <section className="section-v2 section-v2-alt">
          <div className="container">
            <div className="section-v2-row reveal-up">
              <div>
                <span className="section-v2-tag">Handpicked</span>
                <h2 className="section-v2-title">Featured Products</h2>
              </div>
              <Link to="/catalogue" className="btn-text-link">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="product-grid-v2">
              {featured.slice(0, 8).map((p, i) => (
                <div key={p.id} className="prod-card-anim">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── COLLECTIONS ───────────────────────────────────────────── */}
      <section className="section-v2">
        <div className="container">
          <div className="section-v2-header reveal-up">
            <span className="section-v2-tag">Curated for Retailers</span>
            <h2 className="section-v2-title">Our Collections</h2>
            <div className="section-v2-line" />
          </div>
          <div className="collections-v2-grid">
            {collections.map((col, i) => (
              <Link
                to={isAuthenticated ? `/catalogue?collection=${col.id}` : '/login'}
                key={col.id}
                className={`col-card-v2 col-card-anim ${i === 0 ? 'col-card-large' : ''}`}
              >
                <div className="col-card-img">
                  <img src={col.image} alt={col.name} loading="lazy" />
                </div>
                <div className="col-card-overlay">
                  <div className="col-card-info">
                    <h3>{col.name}</h3>
                    <p>{col.description}</p>
                    <span className="col-card-cta">
                      Explore <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────────────────── */}
      {isAuthenticated && newArrivals.length > 0 && (
        <section className="section-v2 section-v2-alt">
          <div className="container">
            <div className="section-v2-row reveal-up">
              <div>
                <span className="section-v2-tag">Just Landed</span>
                <h2 className="section-v2-title">New Arrivals</h2>
              </div>
              <Link to="/new-arrivals" className="btn-text-link">
                See All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="product-grid-v2">
              {newArrivals.slice(0, 4).map(p => (
                <div key={p.id} className="prod-card-anim">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STATS ROW ─────────────────────────────────────────────── */}
      <section className="stats-section" ref={statsRef}>
        <div className="container stats-inner">
          {[
            { val: 45, suffix: '+', label: 'Years of Excellence' },
            { val: 1000, suffix: '+', label: 'Jewellery Pieces' },
            { val: 500, suffix: '+', label: 'Trade Partners' },
            { val: 99, suffix: '%', label: 'Customer Satisfaction' },
          ].map((s, i) => (
            <div className="stat-block reveal-up" key={i}>
              <span className="stat-number">
                <Counter to={s.val} suffix={s.suffix} />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER (non-auth) ─────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="cta-v2">
          <div className="cta-v2-bg">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&h=600&fit=crop&q=85"
              alt="Join our trade network"
              loading="lazy"
            />
          </div>
          <div className="cta-v2-overlay" />
          <div className="container cta-v2-body">
            <div className="cta-v2-content reveal-up">
              <span className="section-v2-tag" style={{ color: '#d4a843' }}>Trade Partnership</span>
              <h2>Ready to Partner<br />with Us?</h2>
              <p>
                Join hundreds of independent retailers who trust G&amp;J Lumley for their
                wholesale jewellery needs. Open a trade account today.
              </p>
              <div className="cta-v2-actions">
                <Link to="/register" className="btn-hero-primary">
                  Apply for Trade Account <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-hero-ghost">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="testimonial-v2">
        <div className="container">
          <div className="testimonial-v2-inner reveal-up">
            <div className="testimonial-v2-quote-mark">"</div>
            <blockquote>
              G&amp;J Lumley has been our primary wholesale supplier for over fifteen years.
              Their quality is consistently excellent, and their dedicated sales team
              understands exactly what our customers want.
            </blockquote>
            <div className="testimonial-v2-author">
              <div className="author-line" />
              <cite>Margaret Hayes — Hayes Fine Jewellers, Chester</cite>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
