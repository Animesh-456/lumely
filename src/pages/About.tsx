import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { hash } = useLocation()

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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ow-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Parallax Tagline overlap
      gsap.to('.ow-tagline-overlap', {
        y: -120, // Move up to overlap
        ease: 'none',
        scrollTrigger: {
          trigger: '.ow-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    })
    return () => ctx.revert()
  }, [hash])

  return (
    <div className="page-our-world">
      {/* 1. BANNER & TAGLINE PARALLAX */}
      <section className="ow-hero-section">
        <div className="ow-parallax-banner">
          <img 
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&h=1000&fit=crop&q=90" 
            alt="Crafting Fine Jewellery" 
          />
        </div>
        <div className="ow-tagline-container">
          <div className="ow-tagline-overlap">
            <h1>Crafting Bridal & Fine Jewellery For Independent Jewellers Since 1954</h1>
          </div>
        </div>
      </section>

      {/* 2. BRAND WRITE UP */}
      <section id="brand" className="ow-section ow-brand">
        <div className="container">
          <div className="ow-split">
            <div className="ow-split-img ow-reveal">
              <img 
                src="https://images.unsplash.com/photo-1577083165275-5ad1fa6e90db?w=800&h=1000&fit=crop&q=80&grayscale=true" 
                alt="Brand Heritage" 
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>
            <div className="ow-split-text ow-reveal">
              <span className="ow-eyebrow">THE FOUNDATION</span>
              <div className="ow-text-content">
                <p>Established in 1954, G&amp;J Lumley brings decades of expertise and a deep understanding of the UK jewellery market. With a strong presence across England, Scotland, and Ireland, we proudly partner with over 200 independent jewellers, building long-standing relationships rooted in trust, quality, and consistency.</p>
                <p>Specialising in bespoke bridal jewellery, diamond essentials, and contemporary fine jewellery, our collections are thoughtfully developed to reflect evolving customer preferences while maintaining timeless craftsmanship. Every piece is designed with precision, individuality, and wearability in mind.</p>
                <p>Our in-house design and CAD development team ensures a seamless journey from concept to creation, combining innovation with efficient turnaround times and dependable service. Backed by generations of manufacturing expertise, G&amp;J Lumley continues to deliver fine jewellery crafted to support modern independent retail.</p>
              </div>
              <Link to="/contact" className="ow-btn">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CRAFTSMANSHIP */}
      <section id="craftsmanship" className="ow-section ow-craftsmanship">
        <div className="container ow-reveal">
          <div className="ow-craft-block">
            <p>Every G&amp;J Lumley piece is developed with a focus on precision, wearability, and timeless design. From initial sketches and CAD development to stone setting and final polishing, each stage is approached with meticulous attention to detail. Combining traditional craftsmanship with modern innovation, we create fine jewellery designed to meet the expectations of today's independent jeweller.</p>
          </div>
        </div>
      </section>

      {/* 4. THE LUMLEY ADVANTAGE (Sticky scroll) */}
      <section id="advantage" className="ow-section ow-advantage">
        <div className="container">
          <div className="ow-sticky-layout">
            <div className="ow-sticky-left">
              <div className="ow-sticky-content ow-reveal">
                <h2>THE LUMLEY ADVANTAGE</h2>
                <p>With decades of industry expertise and strong retailer relationships across the UK and Ireland, G&amp;J Lumley offers more than fine jewellery — we offer reliability, flexibility, and personalised support.</p>
              </div>
            </div>
            <div className="ow-scroll-right">
              <div className="ow-advantage-card ow-reveal">
                <h3>Bespoke Bridal Expertise</h3>
                <p>From timeless solitaires to custom bridal designs, our collections are thoughtfully developed to meet evolving customer preferences while maintaining exceptional craftsmanship and quality.</p>
              </div>
              <div className="ow-advantage-card ow-reveal">
                <h3>Reliable Turnaround &amp; Support</h3>
                <p>We combine efficient production timelines with responsive, personalised service — ensuring retailers receive consistent support at every stage of the process.</p>
              </div>
              <div className="ow-advantage-card ow-reveal">
                <h3>Designed For Independent Retailers</h3>
                <p>Every collection is curated with the independent jeweller in mind, balancing commercial appeal, contemporary design, and long-term retail value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RETAILER EXPERIENCE */}
      <section id="retailer" className="ow-section ow-retailer">
        <div className="container">
          <div className="ow-retailer-inner ow-reveal">
            <h2>Retailer Experience</h2>
            <ul className="ow-retailer-list">
              <li>Retailer-Only Access</li>
              <li>Easy Order Enquiries</li>
              <li>Wishlist Functionality</li>
              <li>Curated Collection Browsing</li>
              <li>Dedicated Sales Representative Support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. PERSONAL SERVICE */}
      <section id="service" className="ow-section ow-service">
        <div className="ow-service-bg">
          <img 
            src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&h=800&fit=crop&q=90" 
            alt="Committed Partnerships" 
          />
        </div>
        <div className="ow-service-overlay" />
        <div className="container ow-service-content ow-reveal">
          <h2>COMMITTED PARTNERSHIPS</h2>
          <p>At G&amp;J Lumley, relationships remain at the heart of everything we do. We work closely with every retail partner to understand their customer base, preferences, and business needs — offering tailored guidance, responsive communication, and ongoing support at every stage. Our hands-on approach ensures a more collaborative and dependable experience for independent jewellers.</p>
        </div>
      </section>
    </div>
  )
}
