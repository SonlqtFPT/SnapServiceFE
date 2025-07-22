'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import type { SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { SupplierOrderItem } from '@/model/response/order'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getPageNumbers } from '@/lib/helper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast, ToastContainer } from 'react-toastify'
import { updateOrderItemStatus } from '@/services/product/OrderService'
import type { UpdateOrderStatusRequest } from '@/model/request/orderRequest'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useRouter } from 'next/navigation' 

type Props = {
  orders: SupplierOrderItem[]
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (newPage: number) => void
  onRefresh: () => void 
}


export default function SupplierOrderTable({
  orders,
  page,
  pageSize,
  totalItems,
  onPageChange,
  onRefresh,
}: Props) {
  const router = useRouter() 
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  const totalPages = Math.ceil(totalItems / pageSize)

  const [confirmOpen, setConfirmOpen] = useState(false)
const [selectedAction, setSelectedAction] = useState<{
  orderId: string
  productIds: number[]
  status: UpdateOrderStatusRequest['status']
} | null>(null)



  const handleUpdateStatus = async (
    orderId: string,
    productId: number,
    status: UpdateOrderStatusRequest['status']
  ) => {
    const key = `${orderId}-${productId}`
    setLoadingMap(prev => ({ ...prev, [key]: true }))
    try {
      await updateOrderItemStatus({ orderId, productId, status })
      toast.success(`Order ${status === 'Preparing' ? 'accepted' : 'rejected'} successfully.`)
      onRefresh?.() 
    } catch (err) {
      toast.error('Failed to update order status.')
    } finally {
      setLoadingMap(prev => ({ ...prev, [key]: false }))
    }
  }


  const columns = useMemo<ColumnDef<SupplierOrderItem>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ getValue }) => {
        const id = getValue<string>()
        const shortId = `${id.slice(0, 8)}...`
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-gray-700 cursor-help">
                  {shortId}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString('vi-VN', {
          hour12: false,
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      accessorKey: 'userFullName',
      header: 'Customer',
      cell: ({ getValue }) =>
        getValue<string>() || <span className="text-gray-400 italic">Unknown</span>,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ getValue }) => {
        const address = getValue<string>()
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="line-clamp-1 max-w-[200px] text-sm cursor-help">
                  {address}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{address}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    {
      accessorKey: 'total',
      header: 'Total Price',
      cell: ({ getValue }) =>
        `${(getValue<number>() || 0).toLocaleString()} đ`,
    },
    {
      accessorKey: 'shippingPrice',
      header: 'Shipping',
      cell: ({ getValue }) =>
        `${(getValue<number>() || 0).toLocaleString()} đ`,
    },
{
  id: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const orderId = row.original.id
    const details = row.original.orders_details || []
    const allStatuses = details.map(d => d.status)
    const isPending = allStatuses.every(status => status === 'Pending')
    const productIds = details.map(d => d.productId)
    const key = productIds.map(pid => `${orderId}-${pid}`).join(',')

    const loading = productIds.some(pid => loadingMap[`${orderId}-${pid}`])

    const badgeMap: Record<UpdateOrderStatusRequest['status'], 'success' | 'warning' | 'destructive' | 'default'> = {
      Pending: 'warning',
      Preparing: 'warning',
      Delivery: 'warning',
      Delivered: 'success',
      Returned: 'destructive',
      Cancelled: 'destructive',
      Refunding: 'warning',
      Refunded: 'destructive',
    }

    if (isPending) {
      return (
        <div className="flex flex-col gap-1">
          {loading ? (
            <Button size="sm" disabled className="bg-gray-300 text-gray-500">
              Processing...
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedAction({ orderId, productIds, status: 'Preparing' })
                  setConfirmOpen(true)
                }}
              >
                Accept Order
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedAction({ orderId, productIds, status: 'Cancelled' })
                  setConfirmOpen(true)
                }}
              >
                Reject Order
              </Button>
            </>
          )}
        </div>
      )
    }

    // If not all pending, show badge of first (or aggregate logic)
    return (
      <Badge
        variant={badgeMap[allStatuses[0] as UpdateOrderStatusRequest['status']] || 'default'}
        className={allStatuses[0] === 'Cancelled' ? 'text-white' : ''}
      >
        {allStatuses[0]}
      </Badge>
    )
  },
},


  ], [loadingMap])

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="relative overflow-x-auto rounded-lg border bg-white shadow-sm p-4">
      <Input
        placeholder="Search orders..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 max-w-sm"
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ↑' :
                    header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                const orderId = row.original.id
                router.push(`/supplier/orders/${orderId}`)
              }}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-gray-500 py-6">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems} orders
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </Button>
          {getPageNumbers(page, totalPages).map((p, idx) =>
            p === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
            ) : (
              <Button
                key={`page-${p}-${idx}`}
                size="sm"
                variant={p === page ? 'default' : 'outline'}
                className="w-9 h-9 p-0"
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false)
          setSelectedAction(null)
        }}
onConfirm={async () => {
  if (!selectedAction) return
  const { orderId, productIds, status } = selectedAction

  for (const productId of productIds) {
    await handleUpdateStatus(orderId, productId, status)
  }

  setConfirmOpen(false)
  setSelectedAction(null)
}}

        title={`Confirm ${selectedAction?.status === 'Preparing' ? 'Accept' : 'Reject'}?`}
        description={`Are you sure you want to ${selectedAction?.status === 'Preparing' ? 'accept' : 'reject'} this order?`}
        confirmText={selectedAction?.status === 'Preparing' ? 'Accept' : 'Reject'}
        loading={
          selectedAction
    ? selectedAction.productIds.some(pid =>
        loadingMap[`${selectedAction.orderId}-${pid}`]
      )
            : false
        }
      />
    </div>
  )
}
