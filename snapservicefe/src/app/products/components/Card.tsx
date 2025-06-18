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

// Skeleton Components
const ProductCardSkeleton = () => (
    <div className="flex flex-col gap-2 bg-white shadow-md rounded-md p-4 animate-pulse">
        {/* Image skeleton */}
        <div className="w-[200px] h-[200px] bg-gray-300 rounded-md"></div>
        
        {/* Title skeleton */}
        <div className="mt-2 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="flex gap-3 items-center mt-2">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                ))}
            </div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
        </div>
        
        {/* Price skeleton */}
        <div className="flex gap-2 items-center mt-2">
            <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
        
        {/* Stock status skeleton */}
        <div className="flex gap-2 items-center mt-2">
            <div className="w-10 h-10 bg-gray-300 rounded-2xl"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
    </div>
)

const PaginationSkeleton = () => (
    <div className="flex items-center justify-center gap-2 mt-6 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-300 rounded"></div>
        ))}
        <div className="h-8 bg-gray-300 rounded w-16"></div>
    </div>
)

type Props = {
    categoryId: number | null;
};

export default function Card({ categoryId }: Props) {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<searchProductRequest>({
        q: searchParams.get('q') || '',
        page: parseInt(searchParams.get('page') || '1', 10),
        size: parseInt(searchParams.get('size') || '20', 10),
        sortOrder: (searchParams.get('sortOrder') || 'desc'),
        sortBy: (searchParams.get('sortBy') || 'createdAt'),
    });

    useEffect(() => {
        const newPage: searchProductRequest = {
            q: searchParams.get('q') || '',
            page: parseInt(searchParams.get('page') || '1', 10),
            size: parseInt(searchParams.get('size') || '20', 10),
            sortOrder: (searchParams.get('sortOrder') || 'desc'),
            sortBy: (searchParams.get('sortBy') || 'createdAt'),
            categoryId: null,
        };
        setPage(newPage);
    }, [searchParams]);

    const [product, setProduct] = useState<ProductListResponse>(
    {
        totalItems: 0,
        totalPage: 0,
        page: 1,
        pageSize: 20,
        items: [],
    }
    );
    const [productList, setProductList] = useState<ItemResponse[]>([]);

    const getProductsByQuery = async () => {
        try {
            setIsLoading(true)
            const response = await fetchProductsByQuery(page);
            setProduct(response);
            setProductList(response?.items || []);
            console.log("Fetched products:", response);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setPage(prev => ({
            ...prev,
            categoryId: categoryId,
            page: 1 // reset về trang 1 nếu filter thay đổi
        }));
    }, [categoryId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when page changes
        getProductsByQuery();
    }, [page]);

    if (isLoading) {
        return (
            <div className='flex flex-col gap-4'>
                {/* Sort skeleton */}
                <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
                
                {/* Product cards skeleton */}
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(20)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
                
                {/* Pagination skeleton */}
                <div className='flex justify-center mt-4'>
                    <PaginationSkeleton />
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            <Sort products={product} />
            <div className="grid grid-cols-5 gap-4">
                {productList.map((item) => {
                    return (
                        <Link href={`/products/${item.slug}`} key={item?.id} className="flex flex-col gap-2 bg-white shadow-md rounded-md p-4 relative cursor-pointer hover:scale-105 transition-transform duration-300">
                            {item?.isSale && (
                                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md absolute top-2 left-2 z-10">
                                    {item?.discountPercent}%
                                </span>
                            )}
                            <div className="w-[200px] h-[200px] relative">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h2 className="text-lg font-bold mt-2 h-15">{item?.name}</h2>
                            <div className='flex gap-3'><ProductRating rating={item?.ratingAverage} /> {item?.ratingAverage}</div>
                            <div className='flex gap-2 items-center'>
                                {item.isSale ? (
                                    <div className="flex flex-col-reverse gap-2 items-center">
                                        <p className="text-red-500 font-bold text-2xl">{item.discountPrice.toLocaleString()}đ</p>
                                        <p className="text-gray-500 line-through">{item.price.toLocaleString()}đ</p>
                                    </div>
                                ) : (
                                    <p className="text-black flex items-center text-2xl h-16">{item?.price.toLocaleString()}đ</p>
                                )}
                            </div>
                            {item?.stockInQuantity > 0 ? (
                                <div className='flex gap-2 items-center'>
                                    <div className='p-2 bg-green-600 rounded-2xl text-white'><ShoppingCart /></div>
                                    <div className='text-green-600'>IN STOCK</div>
                                </div>
                            ) : (
                                <div className='flex gap-2 items-center'>
                                    <div className='p-2 bg-red-600 rounded-2xl text-white'><ShoppingCart /></div>
                                    <div className='text-red-600'>OUT OF STOCK</div>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>
            <div className='flex justify-center mt-4'>
                <div className="flex items-center justify-center gap-2 mt-6">
                    {/* Previous */}
                    <button
                        onClick={() => setPage(prev => ({
                            ...prev,
                            page: prev.page - 1,
                        }))}
                        disabled={page.page === 1}
                        className="px-3 py-1 text-sm disabled:text-gray-400 cursor-pointer"
                    >
                        &lt; Previous
                    </button>

                    {/* Pages */}
                    {Array.from({ length: product.totalPage }, (_, i) => i + 1)
                        .filter(p =>
                            p === 1 || p === product.totalPage || Math.abs(p - page.page) <= 1
                        )
                        .reduce((acc: number[], p, i, arr) => {
                            if (i > 0 && p - arr[i - 1] > 1) acc.push(-1); // -1 là dấu ...
                            acc.push(p);
                            return acc;
                        }, [])
                        .map(p =>
                            p === -1 ? (
                                <span key={`dots-${Math.random()}`} className="px-2">...</span>
                            ) : (
                                <button
                                    key={p}
                                    className={`px-3 py-1 rounded ${p === page.page
                                        ? 'bg-gray-800 text-gray-300 border border-white'
                                        : 'hover:bg-gray-800 hover:text-gray-300 cursor-pointer'
                                        }`}
                                    onClick={() => setPage(prev => ({
                                        ...prev,
                                        page: p,
                                    }))}
                                >
                                    {p}
                                </button>
                            )
                        )}

                    {/* Next */}
                    <button
                        onClick={() => setPage(prev => ({
                            ...prev,
                            page: prev.page + 1,
                        }))}
                        disabled={page.page === product.totalPage}
                        className="px-3 py-1 text-sm disabled:text-gray-400 cursor-pointer"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}