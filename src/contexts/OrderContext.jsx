import { createContext, useContext, useMemo, useState } from 'react'
import { getOrders, postOrder } from '../api/orders'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const data = await getOrders()
    setOrders(data.orders || [])
  }

  const placeOrder = async (payload) => {
    const data = await postOrder(payload)
    setOrders((prev) => [data.order, ...prev].filter(Boolean))
    return data.order
  }

  const value = useMemo(() => ({ orders, fetchOrders, placeOrder }), [orders])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)
