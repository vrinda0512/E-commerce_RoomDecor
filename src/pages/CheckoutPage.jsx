import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'
import { useOrder } from '../contexts/OrderContext'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal } = useCart()
  const { placeOrder } = useOrder()
  const [address, setAddress] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    await placeOrder({ items, address, total: subtotal })
    navigate('/orders')
  }

  return (
    <PageContainer>
      <div className="glass-card mx-auto max-w-2xl p-6">
        <h2 className="text-3xl font-semibold">Checkout</h2>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Shipping address"
            className="min-h-28 w-full rounded-xl border border-brand-plum/20 bg-white p-3"
            required
          />
          <p className="text-lg">
            Order Total: <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </p>
          <button className="rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105">
            Place Order
          </button>
        </form>
      </div>
    </PageContainer>
  )
}

export default CheckoutPage
