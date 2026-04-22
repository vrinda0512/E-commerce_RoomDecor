import api from './client'

export const getCart = async () => {
  const { data } = await api.get('/cart')
  return data
}

export const postCart = async (payload) => {
  const { data } = await api.post('/cart', payload)
  return data
}
