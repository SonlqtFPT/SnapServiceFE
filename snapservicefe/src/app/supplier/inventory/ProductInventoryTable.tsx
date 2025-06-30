import { SupplierItemResponse } from "@/model/response/productRespone"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"

type Props = {
  products: SupplierItemResponse[]
}

export default function ProductInventoryTable({ products }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">In Stock</th>
            <th className="px-4 py-3">Sold</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
            >
              <td className="px-4 py-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-12 w-12 rounded-md object-cover border"
                />
              </td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">{product.categoryName}</td>
              <td className="px-4 py-3">{product.price.toLocaleString()} VND</td>
              <td className="px-4 py-3">{product.stockInQuantity}</td>
              <td className="px-4 py-3">{product.soldQuantity}</td>
              <td className="px-4 py-3">
                {product.isSale ? (
                  <Badge variant="warning">
                    -{product.discountPercent}%
                  </Badge>
                ) : (
                  <span className="text-gray-400 text-sm">None</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge variant={product.isActive ? "success" : "danger"}>
                  {product.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-100 text-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
