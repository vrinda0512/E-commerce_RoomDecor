import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { addToCart as apiAddToCart, getCart, removeFromCart as apiRemove, updateCartItem as apiUpdate } from '../api/cart'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

// Normalize a cart item from the backend (populated product subdoc)
function normalizeItem(item) {
  const product = item.product || {}
  return {
    _id: item._id,
    productId: product._id || item.productId,
    name: product.name || item.name || '',
    price: product.price || item.price || 0,
    image: product.image || item.image || '',
    category: product.category || item.category || '',
    tags: product.tags || item.tags || [],
    stock: product.stock ?? item.stock ?? 0,
    quantity: item.quantity || 1,
  }
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([])
      return
    }
    try {
      setLoading(true)
      const data = await getCart()
      setItems((data.items || []).map(normalizeItem))
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = async (product, quantity = 1) => {
    try {
      const data = await apiAddToCart({ productId: product._id, quantity })
      setItems((data.items || []).map(normalizeItem))
    } catch (err) {
      console.error('Add to cart failed:', err)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const data = await apiRemove(productId)
      setItems((data.items || []).map(normalizeItem))
    } catch (err) {
      console.error('Remove from cart failed:', err)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(productId)
    }
    try {
      const data = await apiUpdate(productId, quantity)
      setItems((data.items || []).map(normalizeItem))
    } catch (err) {
      console.error('Update quantity failed:', err)
    }
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{ items, subtotal, itemCount, loading, addToCart, removeFromCart, updateQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
