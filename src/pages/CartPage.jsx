import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

function CartPage() {
  const { items, subtotal, loading } = useCart()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <div className="glass-card flex flex-col items-center p-16 text-center">
          <span className="text-5xl">🛒</span>
          <h2 className="mt-4 text-2xl font-bold">Sign in to view your cart</h2>
          <p className="mt-2 text-brand-plum/60">Your saved items will appear here.</p>
          <Link
            to="/login"
            className="mt-6 rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </PageContainer>
    )
  }

  if (loading) {
    return (
      <PageContainer>
        <h1 className="mb-5 text-3xl font-bold">Your Cart</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card h-28 animate-pulse rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    )
  }

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="glass-card flex flex-col items-center p-16 text-center">
          <span className="text-5xl">🛒</span>
          <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-brand-plum/60">
            Discover our curated home decor collection.
          </p>
          <Link
            to="/products"
            className="mt-6 rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <h1 className="mb-5 text-3xl font-bold">Your Cart ({items.length})</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-card h-fit space-y-4 p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-brand-plum/70">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-plum/10 pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="mt-1 text-xs text-brand-plum/50">
              Shipping calculated at checkout
            </p>
          </div>
          <Link
            to="/checkout"
            className="block w-full rounded-full bg-brand-sage px-6 py-3 text-center font-semibold transition hover:scale-105"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/products"
            className="block text-center text-sm text-brand-plum/60 hover:text-brand-plum transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}

export default CartPage
