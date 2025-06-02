'use client'
import Sort from './components/Sort'
import Category from './components/Category'
import Card from './components/Card'
import { ProductType } from '@/types/product/ProductType'
import { fetchProducts } from '@/services/product/ProductService'
import { useEffect, useState } from 'react'



export default function ProductsClient() {
    const [products, setProducts] = useState<ProductType[]>([]);

    const firstProduct = async () => {
        try {
            const response = await fetchProducts(1, 10);
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
                <Sort totalProduct={products.length} />
                <Card products={products} />
            </div>
        </div>
    )
}
