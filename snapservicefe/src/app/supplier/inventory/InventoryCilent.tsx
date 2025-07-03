'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

import { fetchSupplierProducts, deleteProductById } from "@/services/product/ProductService"
import { SupplierItemResponse } from "@/model/response/productRespone"
import { productListRequest } from "@/model/request/productRequest"
import ProductInventoryTable from "./ProductInventoryTable"
import LoadingOverlay from "@/components/ui/LoadingOverlay"

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

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductById(productId)
      setProducts(prev => prev.filter(p => p.id !== productId))
      setTotalItems(prev => prev - 1)
    } catch (err) {
      console.error("Delete failed:", err)
      alert("Failed to delete product.")
    }
  }

  return (
    <div className="p-6">
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
          onDelete={handleDeleteProduct}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
