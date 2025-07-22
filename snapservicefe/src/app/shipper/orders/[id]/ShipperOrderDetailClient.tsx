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
  orderId: string
  productId: number
  status: 'Delivery' | 'Delivered'
}

export default function ShipperOrderDetailClient() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState<ShipperOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<UpdateAction | null>(null)
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

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

  const handleUpdateStatus = async (orderId: string, productId: number, status: 'Delivery' | 'Delivered') => {
    const key = `${orderId}-${productId}`
    setLoadingMap(prev => ({ ...prev, [key]: true }))
    try {
      await updateOrderItemStatus({ orderId, productId, status })
      toast.success(`Updated to ${status}`)
      await refreshOrder()
    } catch (err) {
      toast.error('Failed to update status')
    } finally {
      setLoadingMap(prev => ({ ...prev, [key]: false }))
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
        onConfirm={async () => {
          if (!selectedAction) return
          const { orderId, productId, status } = selectedAction
          await handleUpdateStatus(orderId, productId, status)
          setConfirmOpen(false)
          setSelectedAction(null)
        }}
        title={`Confirm status update?`}
        description={`Are you sure you want to mark this item as "${selectedAction?.status}"?`}
        confirmText={`Mark as ${selectedAction?.status}`}
        loading={
          selectedAction
            ? loadingMap[`${selectedAction.orderId}-${selectedAction.productId}`]
            : false
        }
      />

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Order #{order.id.slice(0, 8)}...</CardTitle>
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

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          {order.orders_details.length === 0 ? (
            <p className="text-gray-500 text-sm">No items found.</p>
          ) : (
            <div className="space-y-4">
              {order.orders_details.map((item) => {
                const nextStatus = item.status === 'Preparing'
                  ? 'Delivery'
                  : item.status === 'Delivery'
                  ? 'Delivered'
                  : null

                const key = `${order.id}-${item.productId}`
                return (
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

                    {/* Button aligned to bottom right */}
                    {nextStatus && (
                      <div className="flex justify-end pt-2">
                        <Button
                          onClick={() => {
                            setSelectedAction({
                              orderId: order.id,
                              productId: item.productId,
                              status: nextStatus,
                            })
                            setConfirmOpen(true)
                          }}
                          size="sm"
                          disabled={loadingMap[key]}
                        >
                          {loadingMap[key] ? 'Processing...' : `Mark as ${nextStatus}`}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                )
              })}
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
