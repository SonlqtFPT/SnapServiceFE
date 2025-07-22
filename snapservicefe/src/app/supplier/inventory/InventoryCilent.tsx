'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

import {
  fetchSupplierProducts,
  toggleProductStatus
} from "@/services/product/ProductService"
import { SupplierItemResponse } from "@/model/response/productRespone"
import { productListRequest } from "@/model/request/productRequest"
import ProductInventoryTable from "./ProductInventoryTable"
import LoadingOverlay from "@/components/ui/LoadingOverlay"
import { toast, ToastContainer } from 'react-toastify'

export default function InventoryClient() {
  const [products, setProducts] = useState<SupplierItemResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const router = useRouter()

  const loadData = async () => {
    setLoading(true)
    const request: productListRequest = { page, pageSize }

    try {
      const res = await fetchSupplierProducts(request)
      setProducts(res.items)
      setTotalItems(res.totalItems)
    } catch (err) {
      console.error("Failed to fetch products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page])

  const handleAddProduct = () => {
    router.push("/supplier/inventory/add")
  }

  const handleToggleProductStatus = async (productId: number, currentStatus: boolean) => {
    try {
      const product = products.find(p => p.id === productId)
      if (!product) return

      await toggleProductStatus(productId, { isActive: !currentStatus })
      await loadData()

      toast.success(
        `${product.name} has been ${currentStatus ? 'deactivated' : 'activated'} successfully.`
      )
    } catch (err) {
      console.error("Toggle status failed:", err)
      toast.error("Failed to update product status.")
    }
  }


  return (
    <div className="p-6">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Supplier's Inventory</h1>
        <button
          onClick={handleAddProduct}
          className="inline-flex items-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
        >
          <PlusCircle className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="relative min-h-[300px]">
          <LoadingOverlay text="Loading inventory..." />
        </div>
      ) : (
        <ProductInventoryTable
          products={products}
          onToggleStatus={handleToggleProductStatus}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
