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
    image: '/banner1.jpg',
    mobileImage: '/banner1.jpg',
    heading: '',
    collection: 'eternal-classics',
  },
  {
    image: '/banner2.jpg',
    mobileImage: '/banner2.jpg',
    heading: '',
    collection: 'modern-elegance',
  },
  {
    image: '/banner3.jpg',
    mobileImage: '/banner3.jpg',
    heading: '',
    collection: 'bridal',
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (idx: number) => {
    setCurrent(idx)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <section className="sc-hero">
      {/* Slides Track */}
      <div
        className="sc-hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="sc-hero-slide"
            aria-hidden={i !== current}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
              <img src={slide.image} alt={slide.heading} />
            </picture>
          </div>
        ))}
      </div>

      {/* Subtle overlay */}
      <div className="sc-hero-overlay" />

      {/* Hero text — bottom left like Shy Creation */}
      <div className="sc-hero-content container">
        <h1 className="sc-hero-heading">
          {HERO_SLIDES[current].heading}
        </h1>
        {/* <Link to={`/catalogue?collection=${HERO_SLIDES[current].collection}`} className="sc-hero-cta">
          Explore Collection <ArrowRight size={16} />
        </Link> */}
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
  { name: 'International Jewellery London', date: 'Sept 1–3, 2025', location: 'Excel London', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop&q=80' },
  { name: 'Spring Fair Birmingham', date: 'Feb 2–5, 2026', location: 'NEC Birmingham', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=600&fit=crop&q=80' },
  { name: 'Goldsmiths Fair', date: 'Oct 3–12, 2025', location: 'Goldsmiths Centre, London', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&q=80' },
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
        <div className="sc-brand-intro-split sc-reveal">
          <div className="sc-brand-intro-content">
            <span className="sc-eyebrow">Est. 1954 · Leeds, West Yorkshire, UK</span>
            <h2 className="sc-brand-intro-heading">
              Fine Wholesale Jewellery,
              <em>  Crafted for Retailers</em>
            </h2>
            <p className="sc-brand-intro-text">
              Established in 1954, G&amp;J Lumley has built lasting partnerships with
              independent jewellers across the UK and Ireland through craftsmanship,
              precision, and personalised service.
            </p>
            <Link to="/about" className="sc-text-link">
              Read More <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="sc-brand-intro-img">
            <img src="/brand-intro.png" alt="Fine Wholesale Jewellery" />
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

          {featured.length > 0 ? (
            <>
              <div className="sc-product-grid">
                {featured.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="sc-stagger-item">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              <div className="sc-section-action sc-reveal">
                <Link to="/catalogue" className="sc-btn-outline">
                  Browse Now <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* ── 4. FULL BANNER (Craftsmanship Image) ────────────────────── */}
      <section className="sc-full-banner">
        <div className="sc-full-banner-img">
          <img src="/craftmanship.jpg" alt="Craftsmanship" />
        </div>
        {/* <div className="sc-full-banner-overlay" /> */}
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
      {/*
      <section className="sc-shows">
        <div className="container">
          <div className="sc-section-head sc-reveal">
            <span className="sc-eyebrow">Find Us In Person</span>
            <h2 className="sc-section-title">Upcoming Shows &amp; Events</h2>
            <div className="sc-section-rule" />
          </div>

          <div className="sc-shows-grid">
            {SHOWS.map((show, i) => (
              <div className="sc-show-card sc-reveal" key={i}>
                <img src={show.image} alt={show.name} className="sc-show-img" />
                <h3 className="sc-show-name">{show.name}</h3>
                <p className="sc-show-meta">{show.date} <br /> {show.location}</p>
                <Link to="/contact" className="sc-show-cta">
                  Book Appointment <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

    </div>
  )
}
