import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/products'
import FilterPanel from '../components/FilterPanel'
import PageContainer from '../components/PageContainer'
import ProductCard from '../components/ProductCard'
import { useCart } from '../contexts/CartContext'

function ProductListPage() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ category: 'all', tags: [] })
  const { addToCart } = useCart()

  useEffect(() => {
    getProducts().then((data) => setProducts(data.products || []))
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
        <h2 className="text-3xl font-semibold">Shop Products</h2>
        <p className="text-brand-plum/70">
          Filter by decor categories and reusable tag systems for future domains.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default ProductListPage
