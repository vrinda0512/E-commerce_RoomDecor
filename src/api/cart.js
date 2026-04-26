import api from './client'

export const getCart = async () => {
  const { data } = await api.get('/cart')
  return data
}

export const addToCart = async (payload) => {
  const { data } = await api.post('/cart/add', payload)
  return data
}

export const removeFromCart = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`)
  return data
}

export const updateCartItem = async (productId, quantity) => {
  const { data } = await api.patch(`/cart/${productId}`, { quantity })
  return data
}
