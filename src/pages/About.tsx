import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { hash } = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle hash scrolling
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>('.ow-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.ow-reveal-left').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.ow-reveal-right').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })

      // Parallax Banner image
      gsap.to('.ow-parallax-banner img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ow-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Tagline scroll overlap
      gsap.to('.ow-tagline-overlap', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ow-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Advantage counter
      gsap.utils.toArray<HTMLElement>('.ow-stat-num').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10)
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }, pageRef)

    return () => ctx.revert()
  }, [hash])

  return (
    <div className="page-our-world" ref={pageRef}>

      {/* ─── 1. HERO PARALLAX BANNER ─────────────────────────── */}
      <section className="ow-hero-section">
        <div className="ow-parallax-banner">
          <img
            src="/ow-hero.jpg"
            alt="G&J Lumley Fine Jewellery Collection"
          />
          <div className="ow-hero-overlay" />
        </div>
        <div className="ow-tagline-container">
          <div className="ow-tagline-overlap">
            <span className="ow-pre-tagline">Est. 1954</span>
            <h1>Crafting Jewellery Across Generations</h1>
          </div>
        </div>
      </section>

      {/* ─── 2. BRAND WRITE UP ───────────────────────────────── */}
      <section id="brand" className="ow-section ow-brand">
        <div className="container">
          <div className="ow-split">
            <div className="ow-split-img ow-reveal-left">
              <img
                src="/ow-brand.jpg"
                alt="G&J Lumley - Heritage Craftsmanship"
              />
            </div>
            <div className="ow-split-text ow-reveal-right">
              <span className="ow-eyebrow">THE FOUNDATION</span>
              <h2 className="ow-section-heading">Seventy Years of Fine Jewellery Excellence</h2>
              <div className="ow-text-content">
                <p>Established in 1954, G&amp;J Lumley brings decades of expertise and a deep understanding of the UK jewellery market. With a strong presence across England, Scotland, and Ireland, we proudly partner with over 200 independent jewellers, building long-standing relationships rooted in trust, quality, and consistency.</p>
                <p>Specialising in bespoke bridal jewellery, diamond essentials, and contemporary fine jewellery, our collections are thoughtfully developed to reflect evolving customer preferences while maintaining timeless craftsmanship. Every piece is designed with precision, individuality, and wearability in mind.</p>
                <p>Our in-house design and CAD development team ensures a seamless journey from concept to creation, combining innovation with efficient turnaround times and dependable service.</p>
              </div>
              <Link to="/contact" className="ow-btn">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CRAFTSMANSHIP STATEMENT ─────────────────────── */}
      <section id="craftsmanship" className="ow-section ow-craftsmanship">
        <div className="ow-craft-inner">
          <div className="ow-craft-line ow-reveal" />
          <div className="container ow-reveal">
            <span className="ow-eyebrow ow-eyebrow-gold">Our Craft</span>
            <blockquote className="ow-craft-quote">
              Every G&amp;J Lumley piece is developed with a focus on precision, wearability, and timeless design. From initial sketches and CAD development to stone setting and final polishing, each stage is approached with meticulous attention to detail.
            </blockquote>
            <p className="ow-craft-sub">Combining traditional craftsmanship with modern innovation, we create fine jewellery designed to meet the expectations of today's independent jeweller.</p>
          </div>
        </div>
      </section>

      {/* ─── 4. LUMLEY ADVANTAGE (Sticky left, scroll cards right) ─── */}
      <section id="advantage" className="ow-section ow-advantage">
        <div className="container">
          <div className="ow-sticky-layout">

            {/* Left: Sticky heading + image */}
            <div className="ow-sticky-left">
              <div className="ow-sticky-content ow-reveal-left">
                <span className="ow-eyebrow">Why Choose Us</span>
                <h2 className="ow-adv-heading">THE LUMLEY<br />ADVANTAGE</h2>
                <p className="ow-adv-intro">With decades of industry expertise and strong retailer relationships across the UK and Ireland, G&amp;J Lumley offers more than fine jewellery — we offer reliability, flexibility, and personalised support.</p>
                <div className="ow-adv-image-wrap">
                  <img src="/ow-bridal.jpg" alt="Lumley Bridal Collection" />
                </div>
              </div>
            </div>

            {/* Right: Scrolling cards */}
            <div className="ow-scroll-right">
              <div className="ow-advantage-card ow-reveal">
                <div className="ow-adv-card-number">01</div>
                <h3>Bespoke Bridal Expertise</h3>
                <p>From timeless solitaires to custom bridal designs, our collections are thoughtfully developed to meet evolving customer preferences while maintaining exceptional craftsmanship and quality.</p>
                <div className="ow-adv-card-footer">
                  <span className="ow-adv-tag">Bridal</span>
                  <span className="ow-adv-tag">Diamond</span>
                  <span className="ow-adv-tag">Custom</span>
                </div>
              </div>

              <div className="ow-advantage-card ow-reveal">
                <div className="ow-adv-card-number">02</div>
                <h3>Reliable Turnaround &amp; Support</h3>
                <p>We combine efficient production timelines with responsive, personalised service — ensuring retailers receive consistent support at every stage of the process. Our team is always available.</p>
                <div className="ow-adv-card-footer">
                  <span className="ow-adv-tag">Service</span>
                  <span className="ow-adv-tag">Support</span>
                  <span className="ow-adv-tag">Reliable</span>
                </div>
              </div>

              <div className="ow-advantage-card ow-reveal">
                <div className="ow-adv-card-number">03</div>
                <h3>Designed For Independent Retailers</h3>
                <p>Every collection is curated with the independent jeweller in mind, balancing commercial appeal, contemporary design, and long-term retail value for your unique customer base.</p>
                <div className="ow-adv-card-footer">
                  <span className="ow-adv-tag">Retail</span>
                  <span className="ow-adv-tag">Wholesale</span>
                  <span className="ow-adv-tag">B2B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. STATS BAR ────────────────────────────────────── */}
      <section className="ow-stats-section">
        <div className="container">
          <div className="ow-stats-grid">
            <div className="ow-stat ow-reveal">
              <span className="ow-stat-num" data-target="70">70</span>
              <span className="ow-stat-suffix">+</span>
              <span className="ow-stat-label">Years of Excellence</span>
            </div>
            <div className="ow-stat-divider" />
            <div className="ow-stat ow-reveal">
              <span className="ow-stat-num" data-target="200">200</span>
              <span className="ow-stat-suffix">+</span>
              <span className="ow-stat-label">Independent Jewellers</span>
            </div>
            <div className="ow-stat-divider" />
            <div className="ow-stat ow-reveal">
              <span className="ow-stat-num" data-target="3">3</span>
              <span className="ow-stat-suffix"></span>
              <span className="ow-stat-label">Countries: England, Scotland &amp; Ireland</span>
            </div>
            <div className="ow-stat-divider" />
            <div className="ow-stat ow-reveal">
              <span className="ow-stat-num" data-target="1000">1000</span>
              <span className="ow-stat-suffix">+</span>
              <span className="ow-stat-label">Bespoke Designs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. RETAILER EXPERIENCE ──────────────────────────── */}
      <section id="retailer" className="ow-section ow-retailer">
        <div className="container">
          <div className="ow-retailer-inner">
            <div className="ow-retailer-left ow-reveal-left">
              <span className="ow-eyebrow ow-eyebrow-gold">Platform Access</span>
              <h2 className="ow-ret-heading">Retailer Experience</h2>
              <p className="ow-ret-sub">Everything you need to run your jewellery retail business, in one seamless platform designed exclusively for trade partners.</p>
            </div>
            <div className="ow-retailer-right ow-reveal-right">
              <ul className="ow-retailer-list">
                {[
                  'Retailer-Only Access — Exclusive trade portal',
                  'Easy Order Enquiries — Streamlined process',
                  'Wishlist Functionality — Save collections',
                  'Curated Collection Browsing — Explore new ranges',
                  'Dedicated Sales Representative Support',
                ].map((item, i) => (
                  <li key={i}>
                    <span className="ow-ret-check"><Check size={14} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="ow-btn ow-btn-gold">
                Apply for Trade Access <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. PERSONAL SERVICE / COMMITTED PARTNERSHIPS ────── */}
      <section id="service" className="ow-service">
        <div className="ow-service-bg">
          <img
            src="/ow-partnership.jpg"
            alt="Committed Partnerships - G&J Lumley"
          />
        </div>
        <div className="ow-service-overlay" />
        <div className="container ow-service-content ow-reveal">
          <span className="ow-service-eyebrow">Our Promise</span>
          <h2>COMMITTED<br />PARTNERSHIPS</h2>
          <div className="ow-service-divider" />
          <p>At G&amp;J Lumley, relationships remain at the heart of everything we do. We work closely with every retail partner to understand their customer base, preferences, and business needs — offering tailored guidance, responsive communication, and ongoing support at every stage. Our hands-on approach ensures a more collaborative and dependable experience for independent jewellers.</p>
          <Link to="/contact" className="ow-btn ow-btn-outline-white">
            Get In Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
