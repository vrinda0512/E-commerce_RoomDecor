import { useCart } from '../contexts/CartContext'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <article className="glass-card flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'
          }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold line-clamp-2">{item.name}</h3>
          <p className="text-sm text-brand-plum/60">₹{item.price?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-brand-plum/40 mt-0.5">{item.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 rounded-xl border border-brand-plum/20 bg-white">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="px-3 py-1 text-lg font-bold hover:bg-brand-blush rounded-l-xl transition"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="px-3 py-1 text-lg font-bold hover:bg-brand-blush rounded-r-xl transition"
          >
            +
          </button>
        </div>

        <p className="w-24 text-right font-semibold">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </p>

        <button
          onClick={() => removeFromCart(item.productId)}
          className="rounded-full p-2 text-red-400 hover:bg-red-50 transition"
          title="Remove"
        >
          ✕
        </button>
      </div>
    </article>
  )
}

export default CartItem
