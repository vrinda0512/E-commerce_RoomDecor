import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    getProductById(id)
      .then((data) => {
        // Backend returns product directly
        setProduct(data._id ? data : data.product || null)
      })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    await addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="glass-card grid gap-8 p-6 md:grid-cols-2 animate-pulse">
          <div className="h-[420px] w-full rounded-xl bg-brand-lavender/30" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded-xl bg-brand-lavender/30" />
            <div className="h-4 w-full rounded-xl bg-brand-lavender/30" />
            <div className="h-4 w-2/3 rounded-xl bg-brand-lavender/30" />
          </div>
        </div>
      </PageContainer>
    )
  }

  if (error || !product) {
    return (
      <PageContainer>
        <div className="glass-card flex flex-col items-center p-16 text-center">
          <span className="text-5xl">🪴</span>
          <p className="mt-4 text-lg font-semibold">{error || 'Product not found'}</p>
          <Link
            to="/products"
            className="mt-4 rounded-full bg-brand-lavender px-5 py-2 text-sm font-semibold transition hover:scale-105"
          >
            Back to Shop
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="glass-card grid gap-8 p-6 md:grid-cols-2">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full rounded-xl object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
              <span className="rounded-full bg-white px-4 py-2 font-semibold text-brand-plum">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-plum/50">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 leading-relaxed text-brand-plum/70">{product.description}</p>

          {product.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-plum/20 px-3 py-1 text-xs font-medium text-brand-plum/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6 text-3xl font-bold">₹{product.price?.toLocaleString('en-IN')}</p>

          <p className={`mt-1 text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-6 rounded-full px-8 py-3 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
              added ? 'bg-brand-sage' : 'bg-brand-lavender'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          <Link
            to="/products"
            className="mt-4 block text-sm text-brand-plum/60 hover:text-brand-plum transition"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}

export default ProductDetailPage
