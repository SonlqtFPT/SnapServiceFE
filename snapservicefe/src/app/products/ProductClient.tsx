'use client'
import Sort from './components/Sort'
import Category from './components/Category'
import Card from './components/Card'
import { fetchProducts } from '@/services/product/ProductService'
import { useEffect, useState } from 'react'
import { ProductListResponse } from '@/model/response/productRespone'



export default function ProductsClient() {
    const [products, setProducts] = useState<ProductListResponse>();

    const firstProduct = async () => {
        try {
            const response = await fetchProducts({page: 1, pageSize: 20});
            setProducts(response);
            return response;
        } catch (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }
    }
    useEffect(() => {
        firstProduct()
    }, [])

    return (
        <div className='flex gap-4'>
            <div className='w-[20%]'>
                <Category />
            </div>
            <div className='flex flex-col w-[80%] gap-5'>
                {products && <Sort products={products} />}
                {products && <Card products={products} />}
            </div>
        </div>
    )
}
