'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { addSupplierProduct, fetchCategories } from "@/services/product/ProductService"
import { AddProductRequest } from "@/model/request/productRequest"
import { CategoryResponse } from "@/model/response/categoryResponse"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  const [categories, setCategories] = useState<CategoryResponse[]>([])

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res))
      .catch((err) => {
        console.error("Failed to load categories", err)
        toast.error("Failed to load categories")
      })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left side: General Info + Pricing */}
          <div className="md:col-span-2 space-y-6">

            {/* General Information */}
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic details about the product.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a brief product description..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing and Stock</CardTitle>
                <CardDescription>Define price, discounts and stock levels.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="flex items-center gap-2 mt-6">
                  <Switch
                    id="isSale"
                    checked={formData.isSale}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isSale: checked }))
                    }
                  />
                  <Label htmlFor="isSale">Enable Sale</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side: Image + Category */}
          <div className="space-y-6">

            {/* Image Upload (placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Upload product images.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-dashed border-2 rounded-lg p-6 text-center text-muted-foreground">
                  📸 Image upload component coming soon...
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>Select a product category.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="categoriesId">Category</Label>
                <select
                  id="categoriesId"
                  name="categoriesId"
                  value={formData.categoriesId}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-2"
                  required
                >
                  <option value={0} disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right pt-4">
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </div>
  )
}
