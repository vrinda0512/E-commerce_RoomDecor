import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="glass-card overflow-hidden p-4 flex flex-col">
      <Link to={`/products/${product._id}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full rounded-xl object-cover transition duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://ak1.ostkcdn.com/images/products/25764586/11.25-In.-Wesley-Black-Mid-Century-Geometric-Copper-Metal-Table-Lamp-10425168-3fd5-460f-8829-ebfe8815c210_600.jpg?impolicy=medium'
            }}
          />
        </div>
        <h3 className="mt-4 text-base font-semibold leading-snug line-clamp-2">{product.name}</h3>
      </Link>

      <p className="mt-1 text-sm text-brand-plum/60 line-clamp-1">
        {product.category}
        {product.tags?.length > 0 && ` · ${product.tags.slice(0, 2).join(', ')}`}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">₹{product.price?.toLocaleString('en-IN')}</span>
          {product.stock === 0 && (
            <p className="text-xs text-red-500 font-medium">Out of stock</p>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="rounded-full bg-brand-lavender px-4 py-2 text-sm font-semibold transition hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
