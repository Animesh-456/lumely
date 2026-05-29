import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    const success = await login(email, password)
    setLoading(false)
    if (success) {
      navigate('/catalogue')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&h=1200&fit=crop)' }}>
          <div className="auth-image-overlay" />
          <div className="auth-image-content">
            <h2>Welcome Back</h2>
            <p>Access your trade account to browse our wholesale catalogue and place orders.</p>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <Link to="/">
              <img src="/logo.jpg" alt="G&J Lumley" className="auth-logo-img" />
            </Link>
            <h1>Trade Login</h1>
            <p className="auth-subtitle">Sign in to your retailer account</p>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-icon">
                  <Mail size={18} />
                  <input type="email" placeholder="you@company.co.uk" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-icon">
                  <Lock size={18} />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password" className="form-link">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-switch">
              Don't have a trade account? <Link to="/register">Apply here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
