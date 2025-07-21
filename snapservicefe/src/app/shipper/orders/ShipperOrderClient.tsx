'use client'

import { useEffect, useState } from 'react'
import { ShipperOrder } from '@/model/response/order'
import { ShipperOrderListRequest } from '@/model/request/orderRequest'
import { fetchShipperOrders } from '@/services/product/OrderService'
import ShipperOrderTable from './ShipperOrderTable'
import LoadingOverlay from '@/components/ui/LoadingOverlay'

export default function ShipperOrderClient() {
  const [orders, setOrders] = useState<ShipperOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const loadData = async () => {
    setLoading(true)
    const request: ShipperOrderListRequest = { page, pageSize }

    try {
      const res = await fetchShipperOrders(request)
      setOrders(res.items ?? [])
      setTotalItems(res.totalItems ?? 0)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setOrders([])
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Shipper Orders</h1>
      </div>

      {loading ? (
        <div className="relative min-h-[300px]">
          <LoadingOverlay text="Loading orders..." />
        </div>
      ) : (
        <ShipperOrderTable
          orders={orders}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onRefresh={loadData} 
        />
      )}
    </div>
  )
}
