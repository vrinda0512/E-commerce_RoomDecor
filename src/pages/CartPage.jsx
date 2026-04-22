import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'

function CartPage() {
  const { items, subtotal, updateQuantity } = useCart()

  return (
    <PageContainer>
      <h2 className="mb-5 text-3xl font-semibold">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onUpdate={updateQuantity} />
        ))}
      </div>
      <div className="mt-6 glass-card flex items-center justify-between p-5">
        <p className="text-lg">
          Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        <Link
          to="/checkout"
          className="rounded-full bg-brand-sage px-6 py-3 font-semibold transition hover:scale-105"
        >
          Checkout
        </Link>
      </div>
    </PageContainer>
  )
}

export default CartPage
