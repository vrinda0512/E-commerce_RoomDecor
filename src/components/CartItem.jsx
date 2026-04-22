function CartItem({ item, onUpdate }) {
  return (
    <article className="glass-card flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-brand-plum/70">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, Number(e.target.value))}
          className="w-16 rounded-lg border border-brand-plum/20 bg-white px-2 py-1"
        />
        <p className="font-medium">${item.price * item.quantity}</p>
      </div>
    </article>
  )
}

export default CartItem
