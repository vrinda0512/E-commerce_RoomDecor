import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import PageContainer from '../components/PageContainer'
import { useCart } from '../contexts/CartContext'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data.product || data))
  }, [id])

  if (!product) {
    return (
      <PageContainer>
        <p>Loading...</p>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="glass-card grid gap-8 p-6 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-[420px] w-full rounded-xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <p className="mt-2 text-brand-plum/70">{product.description}</p>
          <p className="mt-4 text-2xl font-bold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </PageContainer>
  )
}

export default ProductDetailPage
