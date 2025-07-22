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
import { useRouter } from 'next/navigation'
import { ShipperOrder, OrderStatus } from '@/model/response/order'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getPageNumbers } from '@/lib/helper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'react-toastify'
import { updateOrderItemStatus } from '@/services/product/OrderService'

type Props = {
  orders: ShipperOrder[]
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (newPage: number) => void
  onRefresh: () => void
}

export default function ShipperOrderTable({
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

  const handleBatchUpdate = async (
    orderId: string,
    productIds: number[],
    status: 'Delivery' | 'Delivered'
  ) => {
    const key = `${orderId}-batch-${status}`
    setLoadingMap(prev => ({ ...prev, [key]: true }))
    try {
      for (const productId of productIds) {
        await updateOrderItemStatus({ orderId, productId, status })
      }
      toast.success(`Marked as ${status} successfully.`)
      onRefresh()
    } catch {
      toast.error(`Failed to update status.`)
    } finally {
      setLoadingMap(prev => ({ ...prev, [key]: false }))
    }
  }

  const columns = useMemo<ColumnDef<ShipperOrder>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ getValue }) => (
        <span className="text-xs text-gray-700 break-all">
          {getValue<string>()}
        </span>
      ),
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
      },
    },
    {
      accessorKey: 'total',
      header: 'Total Price',
      cell: ({ getValue }) => `${(getValue<number>() || 0).toLocaleString()} đ`,
    },
    {
      accessorKey: 'shippingPrice',
      header: 'Shipping',
      cell: ({ getValue }) => `${(getValue<number>() || 0).toLocaleString()} đ`,
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const details = row.original.orders_details
        const statuses = details.map(d => d.status)
        const statusSet = new Set(statuses)

        const badgeMap: Record<OrderStatus, 'success' | 'warning' | 'destructive' | 'default'> = {
          Pending: 'warning',
          Preparing: 'warning',
          Delivery: 'warning',
          Delivered: 'success',
          Returned: 'destructive',
          Cancelled: 'destructive',
          Refunding: 'warning',
          Refunded: 'destructive',
        }

        const mostCommon = statuses[0] as OrderStatus
        const variant = badgeMap[mostCommon] || 'default'

        return (
          <Badge variant={variant} className={variant === 'destructive' ? 'text-white' : ''}>
            {statusSet.size === 1 ? mostCommon : 'Mixed'}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original
        const productIds = order.orders_details.map(d => d.productId)
        const statuses = order.orders_details.map(d => d.status)
        const allPreparing = statuses.every(s => s === 'Preparing')
        const allDelivery = statuses.every(s => s === 'Delivery')
        const loadingKey = `${order.id}-batch-${allPreparing ? 'Delivery' : 'Delivered'}`

        const nextStatus: 'Delivery' | 'Delivered' | null = allPreparing
          ? 'Delivery'
          : allDelivery
          ? 'Delivered'
          : null

        return (
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/shipper/orders/${order.id}`)}
            >
              View
            </Button>
            {nextStatus && (
              <Button
                size="sm"
                onClick={() => handleBatchUpdate(order.id, productIds, nextStatus)}
                disabled={loadingMap[loadingKey]}
              >
                {loadingMap[loadingKey] ? 'Processing...' : `Mark All as ${nextStatus}`}
              </Button>
            )}
          </div>
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
            <TableRow key={row.id}>
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
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
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
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
