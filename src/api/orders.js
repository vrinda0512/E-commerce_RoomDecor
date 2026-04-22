import api from './client'

export const postOrder = async (payload) => {
  const { data } = await api.post('/order', payload)
  return data
}

export const getOrders = async () => {
  const { data } = await api.get('/orders')
  return data
}
