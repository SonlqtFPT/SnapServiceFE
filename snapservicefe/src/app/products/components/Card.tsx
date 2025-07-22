'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { ProductRating } from './ProductRating'
import { fetchProductsByQuery } from '@/services/product/ProductService'
import { ItemResponse, ProductListResponse } from '@/model/response/productRespone'
import { searchProductRequest } from '@/model/request/productRequest'
import Sort from './Sort'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  categoryId: number | null
}

const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3 bg-white shadow rounded-xl p-4 animate-pulse">
    <div className="w-full aspect-square bg-gray-300 rounded-xl" />
    <div className="h-4 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="flex gap-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
      ))}
    </div>
    <div className="h-6 bg-gray-300 rounded w-24 mt-2" />
    <div className="flex gap-2 items-center mt-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full" />
      <div className="h-4 bg-gray-300 rounded w-16" />
    </div>
  </div>
)

const PaginationSkeleton = () => (
  <div className="flex items-center justify-center gap-2 mt-6 animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-20" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-8 h-8 bg-gray-300 rounded" />
    ))}
    <div className="h-8 bg-gray-300 rounded w-16" />
  </div>
)

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' }
  }),
}

export default function Card({ categoryId }: Props) {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const [page, setPage] = useState<searchProductRequest>({
    q: searchParams.get('q') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    size: parseInt(searchParams.get('size') || '20', 10),
    sortOrder: searchParams.get('sortOrder') || 'desc',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    categoryId: searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId') || '0', 10) : null,
  })

  useEffect(() => {
    setPage(prev => ({
      ...prev,
      q: searchParams.get('q') || '',
      page: parseInt(searchParams.get('page') || '1', 10),
      size: parseInt(searchParams.get('size') || '20', 10),
      sortOrder: searchParams.get('sortOrder') || 'desc',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      categoryId: categoryId,
    }))
  }, [searchParams, categoryId])

  const [product, setProduct] = useState<ProductListResponse>({
    totalItems: 0,
    totalPage: 0,
    page: 1,
    pageSize: 20,
    items: [],
  })

  const [productList, setProductList] = useState<ItemResponse[]>([])

  const getProductsByQuery = async () => {
    try {
      setIsLoading(true)
      const response = await fetchProductsByQuery(page)
      setProduct(response)
      setProductList(response?.items || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getProductsByQuery()
  }, [page])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-10 bg-gray-300 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(20)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <PaginationSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Sort products={product} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productList.map((item, index) => (
          <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            key={item?.id}
          >
            <Link
              href={`/products/${item.slug}`}
              className="h-105 flex flex-col gap-3 bg-white shadow-md hover:shadow-lg rounded-2xl p-4 transition-transform transform hover:-translate-y-1 hover:scale-[1.02] duration-300 relative"
            >
              {item?.isSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  -{item?.discountPercent}%
                </span>
              )}

              <div className="w-full aspect-square relative">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h2 className="text-base font-semibold line-clamp-2 min-h-[48px]">{item?.name}</h2>

              <div className="flex items-center gap-2">
                <ProductRating rating={item?.ratingAverage} />
                <span className="text-sm text-gray-600">({item?.ratingAverage})</span>
              </div>

              {item.isSale ? (
                <div className="flex flex-col items-start h-20">
                  <p className="text-red-500 font-bold text-lg">{item.discountPrice.toLocaleString()}đ</p>
                  <p className="text-gray-400 line-through text-sm">{item.price.toLocaleString()}đ</p>
                </div>
              ) : (
                <p className=" h-20 text-lg font-bold text-gray-800">{item?.price.toLocaleString()}đ</p>
              )}

              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${item?.stockInQuantity > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                  <ShoppingCart className="text-white" size={16} />
                </div>
                <span className={`text-sm font-medium ${item?.stockInQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item?.stockInQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={page.page === 1}
            className="px-3 py-1 text-sm disabled:text-gray-400 cursor-pointer"
          >
            &lt; Trước
          </button>

          {Array.from({ length: product.totalPage }, (_, i) => i + 1)
            .filter(p => p === 1 || p === product.totalPage || Math.abs(p - page.page) <= 1)
            .reduce((acc: number[], p, i, arr) => {
              if (i > 0 && p - arr[i - 1] > 1) acc.push(-1)
              acc.push(p)
              return acc
            }, [])
            .map(p =>
              p === -1 ? (
                <span key={`dots-${Math.random()}`} className="px-2">...</span>
              ) : (
                <button
                  key={p}
                  className={`px-3 py-1 rounded ${p === page.page
                    ? 'bg-gray-800 text-white'
                    : 'hover:bg-gray-200 text-gray-800 cursor-pointer'
                    }`}
                  onClick={() => setPage(prev => ({ ...prev, page: p }))}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => setPage(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={page.page === product.totalPage}
            className="px-3 py-1 text-sm disabled:text-gray-400 cursor-pointer"
          >
            Tiếp &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
