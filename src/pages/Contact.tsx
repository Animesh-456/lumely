import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await api.submitContactForm(form)
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="page-contact">
      <div className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      <div className="container contact-layout">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Whether you have a question about our products, need assistance with an order, or want to discuss opening a trade account, our team is here to help.</p>

          <div className="contact-cards">
            <div className="contact-card">
              <MapPin size={24} />
              <div>
                <h4>Visit Us</h4>
                <p>G & J Lumley Ltd<br />C/O McCarthys Business Center Suite15, Education Road<br />West Yorkshire<br />LS7 2AL</p>
              </div>
            </div>
            <div className="contact-card">
              <Phone size={24} />
              <div>
                <h4>Call Us</h4>
                <p><a href="tel:+441132379628">+44 (0) 113 237 9628</a></p>
                <p className="contact-card-sub">Monday to Friday, 9am – 5pm</p>
              </div>
            </div>
            <div className="contact-card">
              <Mail size={24} />
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:anita@lumlyjewellery.co.uk">anita@lumlyjewellery.co.uk</a></p>
                <p className="contact-card-sub">We aim to respond within 24 hours</p>
              </div>
            </div>
            <div className="contact-card">
              <MessageCircle size={24} />
              <div>
                <h4>WhatsApp</h4>
                <p><a href="https://wa.me/919833899457" target="_blank" rel="noopener noreferrer">+91 9833899457</a></p>
                <p className="contact-card-sub">For Bespoke Inquiries</p>
              </div>
            </div>
            <div className="contact-card">
              <Clock size={24} />
              <div>
                <h4>Opening Hours</h4>
                <p>Mon – Fri: 9:00am – 5:00pm<br />Sat & Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {sent ? (
            <div className="contact-success">
              <CheckCircle size={48} />
              <h3>Message Sent</h3>
              <p>Thank you for your enquiry. A member of our team will be in touch shortly.</p>
              <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }) }}>Send Another Message</button>
            </div>
          ) : (
            <>
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" value={form.company} onChange={e => update('company', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select value={form.subject} onChange={e => update('subject', e.target.value)} required>
                      <option value="">Select a subject</option>
                      <option value="trade-account">Trade Account Enquiry</option>
                      <option value="product">Product Enquiry</option>
                      <option value="order">Existing Order</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={5} value={form.message} onChange={e => update('message', e.target.value)} required placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="G&J Lumley Location"
          src="https://maps.google.com/maps?q=G%20%26%20J%20Lumley%20Ltd%2C%20C%2FO%20McCarthys%20Business%20Center%20Suite15%2C%20Education%20Road%2C%20West%20Yorkshire%2C%20LS7%202AL&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}
