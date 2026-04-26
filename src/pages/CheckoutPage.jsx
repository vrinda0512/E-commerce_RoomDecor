import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCheckout, verifyPayment } from '../api/orders'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Sg7qDlakv5cboB'

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, fetchCart } = useCart()
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: 'India' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setLoading(true)
    try {
      const ready = await loadRazorpay()
      if (!ready) throw new Error('Razorpay failed to load.')

      const { order: rzpOrder } = await createCheckout({ amount: subtotal, shippingAddress: address })

      const options = {
        key: RAZORPAY_KEY,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: 'Luna Decor',
        description: 'Home Decor Purchase',
        order_id: rzpOrder.id,
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: items.map((i) => ({ product: i.productId, quantity: i.quantity, price: i.price })),
              totalAmount: subtotal,
              shippingAddress: address,
            })
            await fetchCart()
            navigate('/orders')
          } catch {
            setError('Payment verified but order save failed. Contact support.')
            setLoading(false)
          }
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#EDC9F9' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (resp) => {
        setError(`Payment failed: ${resp.error.description}`)
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Checkout failed. Try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="glass-card flex flex-col items-center p-16 text-center">
          <span className="text-5xl">🛒</span>
          <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
          <a
            href="/products"
            className="mt-4 rounded-full bg-brand-lavender px-5 py-2 text-sm font-semibold transition hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Shipping form */}
        <div className="glass-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form id="checkout-form" onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-plum/70">Street Address</label>
              <textarea
                name="address"
                value={address.address}
                onChange={handleChange}
                placeholder="123 MG Road, Apartment 4B"
                className="min-h-20 w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-plum/70">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Pune"
                  className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-plum/70">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  placeholder="411001"
                  className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-plum/70">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
                required
              />
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="glass-card h-fit space-y-4 p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-brand-plum/70">
                <span className="line-clamp-1 max-w-[160px]">{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-plum/10 pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button
            form="checkout-form"
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Opening Payment…' : '💳 Pay with Razorpay'}
          </button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CheckoutPage
