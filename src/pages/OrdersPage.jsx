import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import { useOrder } from '../contexts/OrderContext'

const STATUS_STYLES = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-blue-100 text-blue-700',
  failed: 'bg-red-100 text-red-700',
}

function OrdersPage() {
  const { orders, loading, fetchOrders } = useOrder()
  const load = useCallback(() => { fetchOrders() }, [fetchOrders])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <PageContainer>
        <h1 className="mb-5 text-3xl font-bold">Your Orders</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card h-24 animate-pulse rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    )
  }

  if (orders.length === 0) {
    return (
      <PageContainer>
        <div className="glass-card flex flex-col items-center p-16 text-center">
          <span className="text-5xl">📦</span>
          <h2 className="mt-4 text-2xl font-bold">No orders yet</h2>
          <p className="mt-2 text-brand-plum/60">
            Your order history will appear here after checkout.
          </p>
          <Link
            to="/products"
            className="mt-6 rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <h1 className="mb-5 text-3xl font-bold">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order._id} className="glass-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs text-brand-plum/50">Order ID</p>
                <p className="font-mono text-sm font-semibold">{order._id}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {order.status || 'Processing'}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-brand-plum/70">
              <span>
                📦 {(order.items || []).length} item{order.items?.length !== 1 ? 's' : ''}
              </span>
              <span className="font-semibold text-brand-plum">
                ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
              </span>
              {order.createdAt && (
                <span>
                  🗓 {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              )}
            </div>

            {order.shippingAddress?.address && (
              <p className="mt-2 text-xs text-brand-plum/50">
                📍 {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            )}
          </article>
        ))}
      </div>
    </PageContainer>
  )
}

export default OrdersPage
