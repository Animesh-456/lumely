import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', phone: '',
    address: '', city: '', postcode: '', password: '', confirmPassword: '',
    terms: false,
  })

  const update = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!form.terms) { setError('Please accept the terms and conditions.'); return }
    setLoading(true)
    const success = await register(form)
    setLoading(false)
    if (success) navigate('/catalogue')
    else setError('Registration failed. Please try again.')
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=1200&fit=crop)' }}>
          <div className="auth-image-overlay" />
          <div className="auth-image-content">
            <h2>Open a Trade Account</h2>
            <p>Join hundreds of independent retailers partnering with G&J Lumley for quality wholesale jewellery.</p>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <Link to="/">
              <img src="/logo.jpg" alt="G&J Lumley" className="auth-logo-img" />
            </Link>
            <h1>Trade Account Application</h1>
            <p className="auth-subtitle">Fill in your details to apply for a wholesale account</p>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-section-title">Business Details</div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input type="text" value={form.companyName} onChange={e => update('companyName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Contact Name *</label>
                  <input type="text" value={form.contactName} onChange={e => update('contactName', e.target.value)} required />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} required />
                </div>
              </div>

              <div className="form-section-title">Business Address</div>
              <div className="form-group">
                <label>Address *</label>
                <input type="text" value={form.address} onChange={e => update('address', e.target.value)} required />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" value={form.city} onChange={e => update('city', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Postcode *</label>
                  <input type="text" value={form.postcode} onChange={e => update('postcode', e.target.value)} required />
                </div>
              </div>

              <div className="form-section-title">Account Security</div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Password *</label>
                  <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required minLength={8} />
                </div>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
                </div>
              </div>

              <label className="checkbox-label">
                <input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)} />
                I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
              </label>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Submitting application...' : 'Submit Application'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
