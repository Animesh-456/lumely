import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await requestPasswordReset(email)
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515562141589-67f0d27a20db?w=900&h=1200&fit=crop)' }}>
          <div className="auth-image-overlay" />
          <div className="auth-image-content">
            <h2>Password Recovery</h2>
            <p>We'll send you instructions to reset your password.</p>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <Link to="/" className="auth-logo">G&J Lumley</Link>

            {sent ? (
              <div className="auth-success">
                <CheckCircle size={48} />
                <h1>Check Your Email</h1>
                <p>We've sent password reset instructions to <strong>{email}</strong>. Please check your inbox and follow the link to reset your password.</p>
                <Link to="/login" className="btn btn-primary btn-full">Return to Login</Link>
              </div>
            ) : (
              <>
                <h1>Forgot Password</h1>
                <p className="auth-subtitle">Enter your email address and we'll send you a link to reset your password.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-icon">
                      <Mail size={18} />
                      <input type="email" placeholder="you@company.co.uk" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <Link to="/login" className="back-link"><ArrowLeft size={16} /> Back to login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
