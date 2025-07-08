'use client'

import { useEffect, useState } from 'react'
import { SupplierOrderItem } from '@/model/response/order'
import { SupplierOrderListRequest } from '@/model/request/orderRequest'
import { fetchSupplierOrders } from '@/services/product/OrderService'
import SupplierOrderTable from './SupplierOrderTable'
import LoadingOverlay from '@/components/ui/LoadingOverlay'

export default function OrderClient() {
  const [orders, setOrders] = useState<SupplierOrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const loadData = async () => {
    setLoading(true)
    const request: SupplierOrderListRequest = { page, pageSize }

    try {
      const res = await fetchSupplierOrders(request)
      setOrders(res.items)
      setTotalItems(res.totalItems)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
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
        <h1 className="text-2xl font-bold">Supplier's Orders</h1>
      </div>

      {loading ? (
        <div className="relative min-h-[300px]">
          <LoadingOverlay text="Loading orders..." />
        </div>
      ) : (
        <SupplierOrderTable
          orders={orders}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
