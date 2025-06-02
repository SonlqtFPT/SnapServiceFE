'use client'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/types/product/ProductType'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { ProductRating } from './ProductRating'
import { fetchProducts } from '@/services/product/ProductService'

type Props = {
    products: ProductType[]
}

export default function Card({ products }: Props) {
    const [productList, setProductList] = useState<ProductType[]>(products);
    const [page, setPage] = useState(1);
    const getproducts = async () => {
        try {
            const response = await fetchProducts(page, 10);
            setProductList(response);
            console.log("Fetched products:", response);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }

    useEffect(() => {
        getproducts();
    }, [page]);


    return (
        <div>
            <div className="grid grid-cols-5 gap-4">
                {productList.map((item) => {
                    return (
                        <div key={item?.id} className="flex flex-col gap-2 bg-white shadow-md rounded-md p-4 relative cursor-pointer hover:scale-105 transition-transform duration-300">
                            {item?.is_sale && (
                                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md absolute top-2 left-2">
                                    {item?.discount_percent}%
                                </span>
                            )}
                            <Image
                                className="object-cover rounded-md"
                                src={item?.image}
                                alt={item?.name}
                                width={300}
                                height={300}
                            />
                            <h2 className="text-lg font-bold mt-2">{item?.name}</h2>
                            <div className='flex gap-3'><ProductRating rating={item?.rating_average} /> {item?.rating_average}</div>
                            <div className='flex gap-2 items-center'>
                                {item.is_sale ? (
                                    <div className="flex gap-2 items-center">
                                        <p className="text-red-500 font-bold text-2xl">${item.discountPrice}</p>
                                        <p className="text-gray-500 line-through">${item.price}</p>
                                    </div>
                                ) : (
                                    <p className="text-black     flex items-center text-2xl">${item?.price}</p>
                                )}
                            </div>
                            {item?.stock_in_quantity > 0 ? (
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

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
