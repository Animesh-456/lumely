import React, { createContext, useContext, useState, type ReactNode } from 'react'

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  metal: string
  sku: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
  status: 'submitted' | 'processing' | 'confirmed'
}

interface CartContextType {
  items: CartItem[]
  orders: Order[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  submitOrder: () => Order
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId)
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const submitOrder = (): Order => {
    const order: Order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items: [...items],
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'submitted',
    }
    setOrders(prev => [order, ...prev])
    clearCart()
    return order
  }

  return (
    <CartContext.Provider value={{ items, orders, addItem, removeItem, updateQuantity, clearCart, submitOrder, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
