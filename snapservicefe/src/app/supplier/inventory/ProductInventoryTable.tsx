'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { SupplierItemResponse } from '@/model/response/productRespone'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Power } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { getPageNumbers } from '@/lib/helper'
import { useRouter } from 'next/navigation'

type Props = {
  products: SupplierItemResponse[]
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (newPage: number) => void
  onToggleStatus: (productId: number, currentStatus: boolean) => Promise<void>
}

export default function ProductInventoryTable({
  products,
  page,
  pageSize,
  totalItems,
  onPageChange,
  onToggleStatus,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const totalPages = Math.ceil(totalItems / pageSize)
  const router = useRouter()

  const columns = useMemo<ColumnDef<SupplierItemResponse>[]>(() => [
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }) => (
        <img
          src={row.original.imageUrl}
          alt={row.original.name}
          className="h-12 w-12 rounded-md object-cover border"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
    },
    {
      accessorKey: 'categoryName',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ getValue }) =>
        `${(getValue<number>() || 0).toLocaleString()} đ`,
    },
    {
      accessorKey: 'stockInQuantity',
      header: 'In Stock',
    },
    {
      accessorKey: 'soldQuantity',
      header: 'Sold',
    },
    {
      accessorKey: 'discountPercent',
      header: 'Discount',
      cell: ({ row }) =>
        row.original.isSale ? (
          <Badge variant="warning">-{row.original.discountPercent}%</Badge>
        ) : (
          <span className="text-gray-400 text-sm">None</span>
        ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ getValue }) =>
        getValue() ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="destructive">Inactive</Badge>
        ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const { id, isActive } = row.original
        return (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => router.push(`/supplier/inventory/edit/${id}`)}
              className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleStatus(id, isActive)}
              className={`p-1 rounded hover:bg-yellow-100 text-yellow-600 transition`}
              title={isActive ? 'Deactivate' : 'Activate'}
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        )
      },
      enableSorting: false,
    },
  ], [onToggleStatus])

  const table = useReactTable({
    data: products,
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
        placeholder="Search product name or category..."
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
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems} products
          </span>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
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
                key={p}
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
    </div>
  )
}
