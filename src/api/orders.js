import api from './client'

export const getOrders = async () => {
  const { data } = await api.get('/orders/myorders')
  return data
}

export const createCheckout = async (payload) => {
  const { data } = await api.post('/orders/checkout', payload)
  return data
}

export const verifyPayment = async (payload) => {
  const { data } = await api.post('/orders/verify', payload)
  return data
}
