import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  email: string
  companyName: string
  contactName: string
  phone: string
  address: string
  city: string
  postcode: string
  salesRep: string
  accountStatus: 'active' | 'pending'
  joinDate: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<boolean>
}

interface RegisterData {
  email: string
  password: string
  companyName: string
  contactName: string
  phone: string
  address: string
  city: string
  postcode: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
  id: 'usr_001',
  email: 'retailer@example.com',
  companyName: 'Prestige Jewellers Ltd',
  contactName: 'James Richardson',
  phone: '+44 20 7946 0958',
  address: '14 Hatton Garden',
  city: 'London',
  postcode: 'EC1N 8AT',
  salesRep: 'Sarah Mitchell',
  accountStatus: 'active',
  joinDate: '2023-06-15',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('lumley_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    if (email) {
      const u = { ...MOCK_USER, email }
      setUser(u)
      localStorage.setItem('lumley_user', JSON.stringify(u))
      return true
    }
    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000))
    const u: User = {
      id: 'usr_' + Date.now(),
      email: data.email,
      companyName: data.companyName,
      contactName: data.contactName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      salesRep: 'Sarah Mitchell',
      accountStatus: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
    }
    setUser(u)
    localStorage.setItem('lumley_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lumley_user')
  }

  const requestPasswordReset = async (_email: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, requestPasswordReset }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
