'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {
  fetchSupplierOrderDetail,
  updateOrderItemStatus,
} from '@/services/product/OrderService'
import type { SupplierOrderItem } from '@/model/response/order'
import type { UpdateOrderStatusRequest } from '@/model/request/orderRequest'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

export default function OrderDetailClient() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState<SupplierOrderItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<UpdateOrderStatusRequest['status'] | null>(null)
  const [updating, setUpdating] = useState(false)

  const loadOrder = async () => {
    if (typeof id !== 'string') return
    setLoading(true)
    try {
      const result = await fetchSupplierOrderDetail({ orderId: id })
      setOrder(result)
    } catch {
      toast.error('Failed to load order detail')
      router.push('/supplier/orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()
  }, [id])

  const handleUpdateOrderStatus = async () => {
    if (!order || !selectedStatus) return
    setUpdating(true)
    try {
      await updateOrderItemStatus({ orderId: order.id, status: selectedStatus })
      toast.success(`Order ${selectedStatus === 'Preparing' ? 'accepted' : 'rejected'} successfully.`)
      await loadOrder()
    } catch {
      toast.error(`Failed to ${selectedStatus === 'Preparing' ? 'accept' : 'reject'} order.`)
    } finally {
      setUpdating(false)
      setConfirmOpen(false)
      setSelectedStatus(null)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-48 w-full rounded-md" />
      </div>
    )
  }

  if (!order) {
    return <p className="p-6 text-red-500">Order not found.</p>
  }

  const hasPendingItems = order.orders_details.some(item => item.status === 'Pending')

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false)
          setSelectedStatus(null)
        }}
        onConfirm={handleUpdateOrderStatus}
        title={`Confirm ${selectedStatus === 'Preparing' ? 'Accept' : 'Reject'} Order?`}
        description={`Are you sure you want to ${selectedStatus === 'Preparing' ? 'accept' : 'reject'} this order and all its items?`}
        confirmText={selectedStatus === 'Preparing' ? 'Accept' : 'Reject'}
        loading={updating}
      />

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Order #{order.id}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><strong>Customer:</strong> {order.userFullName || 'Unknown'}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          </div>
          <div>
            <p><strong>Shipping:</strong> {order.shippingPrice.toLocaleString()} ₫</p>
            <p><strong>Total:</strong> {order.total.toLocaleString()} ₫</p>
            <p><strong>Supplier:</strong> {order.supplierName}</p>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status & Timeline</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Paid At:</span>
            <span>{order.paidAt ? new Date(order.paidAt).toLocaleString('vi-VN') : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Delivered At:</span>
            <span>{order.deliveriedAt ? new Date(order.deliveriedAt).toLocaleString('vi-VN') : 'N/A'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Items + Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Items</CardTitle>
            {hasPendingItems && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    setSelectedStatus('Preparing')
                    setConfirmOpen(true)
                  }}
                >
                  Accept All
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => {
                    setSelectedStatus('Cancelled')
                    setConfirmOpen(true)
                  }}
                >
                  Reject All
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {order.orders_details.length === 0 ? (
            <p className="text-gray-500 text-sm">No items found.</p>
          ) : (
            <div className="space-y-4">
              {order.orders_details.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-start border rounded-md p-3 shadow-sm"
                >
                  <img
                    src={item.productImage || undefined}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1 space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.productName}</span>
                      <Badge variant={statusToBadgeVariant(item.status)}>{item.status}</Badge>
                    </div>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price.toLocaleString()} ₫</p>
                    <p>Discount: {item.discountPercent}%</p>
                    {item.note && (
                      <p className="text-gray-500 italic">Note: {item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function statusToBadgeVariant(status: string) {
  switch (status) {
    case 'Delivered':
      return 'success'
    case 'Cancelled':
    case 'Returned':
    case 'Refunded':
      return 'destructive'
    case 'Pending':
    case 'Preparing':
    case 'Delivery':
    case 'Refunding':
    default:
      return 'warning'
  }
}
