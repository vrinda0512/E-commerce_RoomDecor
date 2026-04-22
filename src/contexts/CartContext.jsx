import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCart, postCart } from '../api/cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const fetchCart = async () => {
    try {
      const data = await getCart()
      setItems(data.items || [])
    } catch {
      setItems([])
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (product, quantity = 1) => {
    const data = await postCart({ productId: product.id, quantity })
    setItems(data.items || [])
  }

  const updateQuantity = async (productId, quantity) => {
    const data = await postCart({ productId, quantity })
    setItems(data.items || [])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{ items, subtotal, addToCart, updateQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
