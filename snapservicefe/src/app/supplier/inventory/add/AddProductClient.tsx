'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { getAPI } from '@/lib/axios'
import {
  addSupplierProduct,
  deleteProductById,
  fetchCategories
} from '@/services/product/ProductService'
import { AddProductRequest } from '@/model/request/productRequest'
import { CategoryResponse } from '@/model/response/categoryResponse'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import LoadingOverlay from '@/components/ui/LoadingOverlay'
import { NumericFormat } from 'react-number-format'

export default function AddProductClient() {
  const router = useRouter()
  const api = getAPI()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [formData, setFormData] = useState<AddProductRequest>({
    name: '',
    price: 1000,
    description: '',
    stockInQuantity: 1,
    discountPercent: 1,
    isSale: false,
    sku: '',
    categoriesId: 0
  })

  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res))
      .catch((err) => {
        console.error('Failed to load categories', err)
        toast.error('Failed to load categories')
      })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    let newValue: string | number = type === 'number' ? Number(value) : value

    if (name === 'discountPercent') {
      const num = Number(value)
      if (num < 0 || num > 100) {
        toast.error("Discount must be between 0 and 100.")
        return
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    )
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Product name is required.'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required.'
    if (!formData.description.trim()) newErrors.description = 'Description is required.'
    if (formData.price < 1000) newErrors.price = 'Price must be at least 1.000 đ.'
    if (formData.stockInQuantity < 1) newErrors.stockInQuantity = 'Stock quantity must be at least 1.'
    if (formData.isSale && (formData.discountPercent < 1 || formData.discountPercent > 100)) {
      newErrors.discountPercent = 'Discount must be between 1 and 100 (%).'
    }
    if (!formData.categoriesId || formData.categoriesId === 0) newErrors.categoriesId = 'Please select a category.'
    if (files.length === 0) newErrors.images = 'At least one image is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please correct the errors before submitting.')
      return
    }

    setErrors({})
    setLoading(true)
    let newProductId: number | null = null

    const sanitizedFormData: AddProductRequest = {
      ...formData,
      discountPercent: formData.isSale ? formData.discountPercent : 0
    }

    try {
      const product = await addSupplierProduct(sanitizedFormData)
      newProductId = product.id

      const contentTypes = files.map((f) => f.type)
      const presignRes = await api.post('/api/Upload/upload-images', {
        productId: product.id,
        productSlug: product.slug,
        supplierId: product.supplierId,
        categoryId: product.categoriesId,
        contentTypes
      })

      const uploads = presignRes.data.data.uploads
      if (!uploads || uploads.length !== files.length) {
        throw new Error('Mismatch between presigned URLs and selected files.')
      }

      await Promise.all(
        uploads.map((upload: any, idx: number) =>
          api.put(upload.url, files[idx], {
            headers: {
              'Content-Type': files[idx].type
            }
          })
        )
      )

      const imageUrls = uploads.map((u: any) => u.imageUrl)
      await api.post(`/api/Upload/${product.id}/confirm-upload`, imageUrls, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain'
        }
      })

      toast.success('Product added!')
      setTimeout(() => {
        router.push('/supplier/inventory')
      }, 2000)
    } catch (err) {
      console.error('Error occurred:', err)
      if (newProductId) {
        try {
          await deleteProductById(newProductId)
          toast.error('Upload failed. Product was rolled back.')
        } catch (deleteError) {
          console.error('Failed to delete product:', deleteError)
          toast.error('Upload failed and rollback unsuccessful.')
        }
      } else {
        toast.error('Failed to create product.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative max-w-7xl mx-auto p-6'>
      <ToastContainer position='bottom-right' autoClose={2000} />
      {loading && <LoadingOverlay text="Processing product..." />}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic details about the product.</CardDescription>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='name'>Product Name</Label>
                  <Input id='name' name='name' value={formData.name} onChange={handleChange}
                    className={errors.name ? 'border-red-500' : ''} required />
                  {errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor='sku'>SKU</Label>
                  <Input id='sku' name='sku' value={formData.sku} onChange={handleChange}
                    className={errors.sku ? 'border-red-500' : ''} required />
                  {errors.sku && <p className='text-sm text-red-600'>{errors.sku}</p>}
                </div>
                <div className='md:col-span-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' name='description' value={formData.description} onChange={handleChange}
                    className={errors.description ? 'border-red-500' : ''} />
                  {errors.description && <p className='text-sm text-red-600'>{errors.description}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing and Stock</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='price'>Price</Label>
                  <NumericFormat
                    id="price"
                    name="price"
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix=" ₫"
                    allowNegative={false}
                    value={formData.price}
                    onValueChange={(values) => {
                      setFormData((prev) => ({
                        ...prev,
                        price: values.floatValue || 0,
                      }))
                    }}
                    className={`w-full border rounded px-3 py-2 ${errors.price ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.price && <p className='text-sm text-red-600'>{errors.price}</p>}
                </div>
                <div>
                  <Label htmlFor='discountPercent'>Discount (%)</Label>
                  <Input id='discountPercent' name='discountPercent' type='number' min={1} max={100}
                    value={formData.discountPercent} onChange={handleChange} disabled={!formData.isSale}
                    className={errors.discountPercent ? 'border-red-500' : ''} />
                  {errors.discountPercent && <p className='text-sm text-red-600'>{errors.discountPercent}</p>}
                </div>
                <div>
                  <Label htmlFor='stockInQuantity'>Stock Quantity</Label>
                  <Input id='stockInQuantity' name='stockInQuantity' type='number' min={1}
                    value={formData.stockInQuantity} onChange={handleChange}
                    className={errors.stockInQuantity ? 'border-red-500' : ''} />
                  {errors.stockInQuantity && <p className='text-sm text-red-600'>{errors.stockInQuantity}</p>}
                </div>
                <div className='flex items-center gap-2 mt-6'>
                  <Switch
                    id='isSale'
                    checked={formData.isSale}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        isSale: checked,
                        discountPercent: checked ? (prev.discountPercent || 1) : 0
                      }))
                    }
                  />
                  <Label htmlFor='isSale'>Enable Sale</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            <Card className='flex flex-col'>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='border-dashed border-2 border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors'
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}>
                  <p className='text-gray-600'>Click or drag & drop to upload images</p>
                  <input type='file' multiple accept='image/*' ref={fileInputRef}
                    onChange={handleFileChange} className='hidden' />
                </div>
                {errors.images && <p className='text-sm text-red-600 mt-2'>{errors.images}</p>}
                {files.length > 0 && (
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                    {files.map((file, idx) => (
                      <div key={idx} className='relative aspect-[1/1] border border-gray-200 rounded overflow-hidden shadow-sm group'>
                        <img src={URL.createObjectURL(file)} alt={`preview-${idx}`}
                          className='object-cover w-full h-full' />
                        <button type='button' onClick={() => removeImage(idx)}
                          className='absolute top-1 right-1 bg-white text-red-500 border border-red-300 rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center shadow-sm opacity-80 group-hover:opacity-100'>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor='categoriesId'>Category</Label>
                <select id='categoriesId' name='categoriesId' value={formData.categoriesId}
                  onChange={handleChange} className={`w-full border rounded px-3 py-2 mt-2 ${errors.categoriesId ? 'border-red-500' : ''}`} required>
                  <option value={0} disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoriesId && <p className='text-sm text-red-600'>{errors.categoriesId}</p>}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='text-right pt-4'>
          <Button type='submit' disabled={loading}>
            {loading ? 'Uploading...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
