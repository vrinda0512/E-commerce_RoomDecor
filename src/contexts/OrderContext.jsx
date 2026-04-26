import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { getOrders } from '../api/orders'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getOrders()
      // Backend returns an array directly
      setOrders(Array.isArray(data) ? data : data.orders || [])
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo(() => ({ orders, loading, fetchOrders }), [orders, loading, fetchOrders])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)
