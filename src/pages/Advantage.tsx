import React, { useEffect, useState, useRef } from 'react'

interface Step {
  num: string
  title: string
  body: string
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Bespoke Bridal Expertise',
    body: 'From timeless solitaires to custom bridal designs, our collections are thoughtfully developed to meet evolving customer preferences while maintaining exceptional craftsmanship and quality.',
  },
  {
    num: '02',
    title: 'Reliable Turnaround & Support',
    body: 'We combine efficient production timelines with responsive, personalised service — ensuring retailers receive consistent support at every stage of the process. Our team is always available.',
  },
  {
    num: '03',
    title: 'Designed For Independent Retailers',
    body: 'Every collection is curated with the independent jeweller in mind, balancing commercial appeal, contemporary design, and long-term retail value for your unique customer base.',
  },
]

export default function LumleyAdvantage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = rect.height
      const scrolled = -rect.top // Height scrolled past the top of the section

      if (scrolled >= 0 && scrolled <= sectionHeight) {
        const totalScrollable = sectionHeight - window.innerHeight
        if (totalScrollable > 0) {
          const progress = scrolled / totalScrollable
          const stepIndex = Math.min(
            Math.max(Math.floor(progress * 3), 0),
            2
          )
          setActiveStep(stepIndex)
        }
      } else if (rect.top > 0) {
        setActiveStep(0)
      } else if (rect.bottom < window.innerHeight) {
        setActiveStep(2)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on load

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="lumley-section" id="advantage" ref={sectionRef}>
      <div className="lumley-container">
        {/* ── Left sticky panel ── */}
        <div className="lumley-left">
          <p className="lumley-eyebrow">Why Choose Us</p>
          <h2 className="lumley-heading">The Lumley<br />Advantage</h2>
          <p className="lumley-desc">
            With decades of industry expertise and strong retailer relationships
            across the UK and Ireland, G&amp;J Lumley offers more than fine
            jewellery — we offer reliability, flexibility, and personalised support.
          </p>
          <div className="lumley-img-wrapper">
            <img src="/ow-bridal.jpg" alt="Lumley Bridal Collection" className="lumley-img" />
          </div>
        </div>

        {/* ── Right sticky panel (with progress track & steps) ── */}
        <div className="lumley-right">
          {/* Vertical progress track */}
          <div className="lumley-progress-track">
            <div 
              className="lumley-progress-bar" 
              style={{ height: `${(activeStep / 2) * 100}%` }}
            />
            {steps.map((_, i) => (
              <div
                key={i}
                className={`lumley-progress-dot${activeStep === i ? ' active' : ''}`}
                onClick={() => {
                  const section = sectionRef.current;
                  if (!section) return;
                  const sectionHeight = section.getBoundingClientRect().height;
                  const totalScrollable = sectionHeight - window.innerHeight;
                  if (totalScrollable > 0) {
                    const scrollTarget = section.offsetTop + (i / 2) * totalScrollable;
                    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>

          <div className="lumley-steps-wrapper">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`lumley-step${activeStep === i ? ' active' : ''}`}
              >
                <span className="step-num">{step.num}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Invisible scroll snap anchors ── */}
      <div className="lumley-snap-container">
        <div className="lumley-snap-anchor" />
        <div className="lumley-snap-anchor" />
        <div className="lumley-snap-anchor" />
      </div>
    </section>
  )
}
