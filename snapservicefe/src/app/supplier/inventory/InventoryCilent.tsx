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
  const router = useRouter()

  useEffect(() => {
    const request: productListRequest = {
      page: 1,
      pageSize: 10,
    }

    fetchSupplierProducts(request)
      .then((res) => setProducts(res.items))
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleAddProduct = () => {
    router.push("/supplier/inventory/add")
  }

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductById(productId)
      setProducts((prev) => prev.filter(p => p.id !== productId))
    } catch (err) {
      console.error("Delete failed:", err)
      alert("Failed to delete product.")
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-[300px]">
        <LoadingOverlay text="Loading inventory..." />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-gray-600">
        <p>No items in inventory.</p>
        <div className="mt-4">
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>
    )
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
      <ProductInventoryTable
        products={products}
        onDelete={handleDeleteProduct}
      />
    </div>
  )
}
