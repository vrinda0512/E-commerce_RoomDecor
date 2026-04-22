import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="glass-card p-4">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full rounded-xl object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      </Link>
      <p className="mt-2 text-sm text-brand-plum/70">
        {product.category} | {(product.tags || []).join(', ')}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold">${product.price}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="rounded-full bg-brand-lavender px-4 py-2 text-sm font-semibold transition hover:scale-105"
        >
          Add
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
