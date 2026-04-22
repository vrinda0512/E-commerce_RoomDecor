import { useCallback, useEffect } from 'react'
import PageContainer from '../components/PageContainer'
import { useOrder } from '../contexts/OrderContext'

function OrdersPage() {
  const { orders, fetchOrders } = useOrder()
  const loadOrders = useCallback(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  return (
    <PageContainer>
      <h2 className="mb-5 text-3xl font-semibold">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-brand-plum/70">
                {order.status || 'Processing'}
              </p>
            </div>
            <p className="mt-2 text-sm">
              Items: {(order.items || []).length} | Total: ${order.total}
            </p>
          </article>
        ))}
      </div>
    </PageContainer>
  )
}

export default OrdersPage
