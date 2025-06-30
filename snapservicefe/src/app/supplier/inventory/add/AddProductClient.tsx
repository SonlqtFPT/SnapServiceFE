'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { addSupplierProduct } from "@/services/product/ProductService"
import { AddProductRequest } from "@/model/request/productRequest"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AddProductClient() {
  const router = useRouter()

  const [formData, setFormData] = useState<AddProductRequest>({
    name: "",
    price: 0,
    description: "",
    stockInQuantity: 0,
    discountPercent: 0,
    isSale: false,
    sku: "",
    categoriesId: 0,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addSupplierProduct(formData)
      toast.success("Product added successfully!")
      router.push("/supplier/inventory")
    } catch (error) {
      console.error("Add product failed:", error)
      toast.error("Failed to add product.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details below to create a new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="discountPercent">Discount (%)</Label>
                <Input id="discountPercent" name="discountPercent" type="number" value={formData.discountPercent} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="stockInQuantity">Stock Quantity</Label>
                <Input id="stockInQuantity" name="stockInQuantity" type="number" value={formData.stockInQuantity} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="categoriesId">Category ID</Label>
                <Input id="categoriesId" name="categoriesId" type="number" value={formData.categoriesId} onChange={handleChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief product description..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id="isSale"
                  checked={formData.isSale}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isSale: checked }))
                  }
                />
                <Label htmlFor="isSale">Enable Sale</Label>
              </div>
              <Button type="submit">Add Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
