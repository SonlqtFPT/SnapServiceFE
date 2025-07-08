'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { getAPI } from '@/lib/axios'
import {
  fetchCategories,
  fetchProductDetailBySlug,
  updateProductById
} from '@/services/product/ProductService'
import { CategoryResponse } from '@/model/response/categoryResponse'
import { UpdateProductRequest } from '@/model/request/productRequest'
import { ProductImageType } from '@/types/product/ProductType'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import LoadingOverlay from '@/components/ui/LoadingOverlay'

export default function EditProductClient() {
  const router = useRouter()
  const api = getAPI()
  const params = useParams()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  

  const [formData, setFormData] = useState<UpdateProductRequest>({
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
  const [existingImages, setExistingImages] = useState<ProductImageType[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [productId, setProductId] = useState<number | null>(null)

    useEffect(() => {
    const rawId = params?.productId
    if (typeof rawId === 'string') {
      const parsed = parseInt(rawId, 10)
      if (!isNaN(parsed)) {
        setProductId(parsed)
      } else {
        toast.error("Invalid product ID in URL.")
        router.push('/supplier/inventory')
      }
    }
  }, [params, router])

  useEffect(() => {
      if (!productId) return;
      
    fetchCategories().then(setCategories)

    const fetchDetail = async () => {
      try {
        const res = await fetchProductDetailBySlug({ slug: productId.toString() })
        setFormData({
          name: res.name,
          price: res.price,
          description: res.description,
          stockInQuantity: res.stockInQuantity,
          discountPercent: res.discountPercent,
          isSale: res.isSale,
          sku: res.sku,
          categoriesId: res.categories.id
        })
        setExistingImages(res.images || [])
      } catch (err) {
        toast.error("Failed to load product")
        router.push('/supplier/inventory')
      }
    }

    fetchDetail()
  }, [productId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? Number(value) : value

    if (name === 'discountPercent') {
      const num = Number(value)
      if (num < 0 || num > 100) {
        toast.error("Discount must be between 0 and 100.")
        return
      }
    }

    setFormData(prev => ({ ...prev, [name]: newValue }))
  }

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const fileList = e.target.files
  if (!fileList) return

  const fileArray = Array.from(fileList)
  setFiles(prev => [...prev, ...fileArray])
}


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"))
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeExistingImage = (id: number) => {
    setExistingImages(prev => prev.filter(i => i.id !== id))
  }

  const removeNewImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Product name is required.'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required.'
    if (!formData.description.trim()) newErrors.description = 'Description is required.'
    if (formData.price < 1000) newErrors.price = 'Price must be at least 1000.'
    if (formData.stockInQuantity < 1) newErrors.stockInQuantity = 'Stock must be at least 1.'
    if (formData.isSale && (formData.discountPercent < 1 || formData.discountPercent > 100)) {
      newErrors.discountPercent = 'Discount must be between 1 and 100.'
    }
    if (!formData.categoriesId) newErrors.categoriesId = 'Category is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error("Please fix the errors before submitting.")
      return
    }

    const totalImages = existingImages.length + files.length
    if (totalImages === 0) {
      toast.error("At least one product image is required.")
      return
    }

    setLoading(true)
    setErrors({})

    try {
      if (productId === null) {
        toast.error("Product ID is not available.")
        return
      }
        
      await updateProductById(productId, formData)

      const oldUrls = existingImages.map(img => img.productImageUrl)
      let newUploadedUrls: string[] = []

      if (files.length > 0) {
        // Handle presign for new images
        const contentTypes = files.map(f => f.type)
        const presignRes = await api.post('/api/Upload/upload-images', {
          productId,
          productSlug: '',
          supplierId: 0,
          categoryId: formData.categoriesId,
          contentTypes
        })

        const uploads = presignRes.data.data.uploads
        if (!uploads || uploads.length !== files.length) throw new Error("Presigned URLs mismatch.")

        await Promise.all(
          uploads.map((upload: any, idx: number) =>
            api.put(upload.url, files[idx], {
              headers: { 'Content-Type': files[idx].type }
            })
          )
        )

        newUploadedUrls = uploads.map((u: any) => u.imageUrl)
      }

      const allImageUrls = [...oldUrls, ...newUploadedUrls]

      if (newUploadedUrls.length > 0 || oldUrls.length !== 0) {
        await api.post(`/api/Upload/${productId}/confirm-upload`, allImageUrls, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/plain'
          }
        })
      }

      toast.success("Product updated!")
      setTimeout(() => router.push('/supplier/inventory'), 1500)
    } catch (err) {
      console.error("Update failed", err)
      toast.error("Failed to update product.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative max-w-7xl mx-auto p-6'>
      <ToastContainer position='bottom-right' autoClose={2000} />
      {loading && <LoadingOverlay text="Updating product..." />}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 space-y-6'>
            {/* General Info */}
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Product information</CardDescription>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' name='name' value={formData.name} onChange={handleChange}
                    className={errors.name ? 'border-red-500' : ''} />
                  {errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor='sku'>SKU</Label>
                  <Input id='sku' name='sku' value={formData.sku} onChange={handleChange}
                    className={errors.sku ? 'border-red-500' : ''} />
                  {errors.sku && <p className='text-sm text-red-600'>{errors.sku}</p>}
                </div>
                <div className='md:col-span-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' name='description' value={formData.description}
                    onChange={handleChange} className={errors.description ? 'border-red-500' : ''} />
                  {errors.description && <p className='text-sm text-red-600'>{errors.description}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader><CardTitle>Pricing & Stock</CardTitle></CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='price'>Price</Label>
                  <Input id='price' name='price' type='number' min={1000} value={formData.price}
                    onChange={handleChange} className={errors.price ? 'border-red-500' : ''} />
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
                  <Label htmlFor='stockInQuantity'>Stock</Label>
                  <Input id='stockInQuantity' name='stockInQuantity' type='number' min={1}
                    value={formData.stockInQuantity} onChange={handleChange}
                    className={errors.stockInQuantity ? 'border-red-500' : ''} />
                  {errors.stockInQuantity && <p className='text-sm text-red-600'>{errors.stockInQuantity}</p>}
                </div>
                <div className='flex items-center gap-2 mt-6'>
                  <Switch id='isSale' checked={formData.isSale}
                    onCheckedChange={(v) => setFormData(prev => ({ ...prev, isSale: v }))} />
                  <Label htmlFor='isSale'>Enable Sale</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <Card>
              <CardHeader><CardTitle>Upload Image</CardTitle></CardHeader>
              <CardContent>
                <div className='border-2 border-dashed rounded-md p-4 text-center cursor-pointer'
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}>
                  <p>Click or drag to upload</p>
                  <input type='file' multiple accept='image/*' ref={fileInputRef}
                    onChange={handleFileChange} className='hidden' />
                </div>

                {/* Old Images */}
                {existingImages.length > 0 && (
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                    {existingImages.map((img, idx) => (
                      <div key={img.id} className='relative aspect-[1/1] border rounded overflow-hidden shadow-sm group'>
                        <img src={img.productImageUrl} alt={`existing-${idx}`} className='object-cover w-full h-full' />
                        <button type='button' onClick={() => removeExistingImage(img.id)}
                          className='absolute top-1 right-1 bg-white text-red-500 border rounded-full w-6 h-6 text-xs flex items-center justify-center'>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Previews */}
                {files.length > 0 && (
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                    {files.map((file, idx) => (
                      <div key={idx} className='relative aspect-[1/1] border rounded overflow-hidden shadow-sm group'>
                        <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className='object-cover w-full h-full' />
                        <button type='button' onClick={() => removeNewImage(idx)}
                          className='absolute top-1 right-1 bg-white text-red-500 border rounded-full w-6 h-6 text-xs flex items-center justify-center'>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Category</CardTitle></CardHeader>
              <CardContent>
                <Label htmlFor='categoriesId'>Category</Label>
                <select id='categoriesId' name='categoriesId' value={formData.categoriesId}
                  onChange={handleChange} className={`w-full border rounded px-3 py-2 mt-2 ${errors.categoriesId ? 'border-red-500' : ''}`}>
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
            {loading ? 'Updating...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
