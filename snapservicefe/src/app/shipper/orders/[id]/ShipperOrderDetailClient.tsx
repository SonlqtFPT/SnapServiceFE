'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { fetchShipperOrderDetail, updateOrderItemStatus } from '@/services/product/OrderService'
import type { ShipperOrder } from '@/model/response/order'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'

type UpdateAction = {
  productIds: number[]
  status: 'Delivery' | 'Delivered'
}

export default function ShipperOrderDetailClient() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState<ShipperOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<UpdateAction | null>(null)
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({})

  const refreshOrder = async () => {
    if (typeof id !== 'string') return
    const res = await fetchShipperOrderDetail(id)
    setOrder(res.data)
  }

  useEffect(() => {
    refreshOrder().catch(() => {
      toast.error('Failed to load order detail')
      router.push('/shipper/orders')
    }).finally(() => setLoading(false))
  }, [id])

  const handleBatchUpdate = async () => {
    if (!selectedAction || !order) return
    for (const pid of selectedAction.productIds) {
      setLoadingMap(prev => ({ ...prev, [pid]: true }))
      try {
        await updateOrderItemStatus({
          orderId: order.id,
          productId: pid,
          status: selectedAction.status
        })
      } catch {
        toast.error(`Failed to update product ${pid}`)
      } finally {
        setLoadingMap(prev => ({ ...prev, [pid]: false }))
      }
    }
    toast.success(`Updated all items to ${selectedAction.status}`)
    setConfirmOpen(false)
    setSelectedAction(null)
    await refreshOrder()
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

  // Determine batchable action
  const preparingItems = order.orders_details.filter(i => i.status === 'Preparing')
  const deliveryItems = order.orders_details.filter(i => i.status === 'Delivery')

  const canMarkAllAsDelivery = preparingItems.length > 0 && deliveryItems.length === 0
  const canMarkAllAsDelivered = deliveryItems.length > 0

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false)
          setSelectedAction(null)
        }}
        onConfirm={handleBatchUpdate}
        title={`Confirm update?`}
        description={`Are you sure you want to mark all applicable items as "${selectedAction?.status}"?`}
        confirmText={`Mark all as ${selectedAction?.status}`}
        loading={
          selectedAction
            ? selectedAction.productIds.some(pid => loadingMap[pid])
            : false
        }
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

      {/* Timeline */}
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

      {/* Items + Batch Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Items</CardTitle>
            <div className="flex gap-2">
              {canMarkAllAsDelivery && (
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    setSelectedAction({
                      productIds: preparingItems.map(i => i.productId),
                      status: 'Delivery',
                    })
                    setConfirmOpen(true)
                  }}
                >
                  Mark all as Delivery
                </Button>
              )}
              {canMarkAllAsDelivered && (
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    setSelectedAction({
                      productIds: deliveryItems.map(i => i.productId),
                      status: 'Delivered',
                    })
                    setConfirmOpen(true)
                  }}
                >
                  Mark all as Delivered
                </Button>
              )}
            </div>
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
                  <div className="flex-1 flex flex-col justify-between text-sm space-y-2">
                    <div>
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
