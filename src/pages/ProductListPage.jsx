import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/products'
import FilterPanel from '../components/FilterPanel'
import PageContainer from '../components/PageContainer'
import ProductCard from '../components/ProductCard'
import { useCart } from '../contexts/CartContext'

function ProductListPage() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ category: 'all', tags: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then((data) => {
        // Backend returns array directly
        const list = Array.isArray(data) ? data : data.products || []
        setProducts(list)
      })
      .catch(() => setError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryOk =
          filters.category === 'all' || product.category === filters.category
        const tagsOk =
          filters.tags.length === 0 ||
          filters.tags.every((tag) => (product.tags || []).includes(tag))
        return categoryOk && tagsOk
      }),
    [products, filters],
  )

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop Collection</h1>
        <p className="mt-1 text-brand-plum/70">
          {loading ? 'Loading products…' : `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />
        <div>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card h-80 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass-card flex flex-col items-center justify-center p-16 text-center">
              <span className="text-5xl">🪴</span>
              <p className="mt-4 text-lg font-semibold">No products found</p>
              <p className="mt-1 text-sm text-brand-plum/60">Try adjusting your filters.</p>
              <button
                onClick={() => setFilters({ category: 'all', tags: [] })}
                className="mt-4 rounded-full bg-brand-lavender px-5 py-2 text-sm font-semibold transition hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default ProductListPage
