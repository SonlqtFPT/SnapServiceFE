'use client'
import React, { useState } from 'react'
import { ProductType } from '@/types/product/ProductType'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { ProductRating } from './ProductRating'

type Props = {
    products: ProductType[]
}

export default function Card({ products }: Props) {
    const [productList, setProductList] = useState<ProductType[]>(products);
    const [animatedIds, setAnimatedIds] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        const updatedProducts = productList.map((item) => {
            if (item.id === id) {
                return { ...item, is_favorite: !item.is_favorite };
            }
            return item;
        });
        setProductList(updatedProducts);
        setAnimatedIds((prev) => [...prev, id]);

        setTimeout(() => {
            setAnimatedIds((prev) => prev.filter((itemId) => itemId !== id));
        }, 500);
    };


    return (
        <div>
            <div className="grid grid-cols-5 gap-4">
                {productList.map((item) => {
                    const isAnimated = animatedIds.includes(item.id);

                    return (
                        <div key={item.id} className="flex flex-col gap-2 bg-white shadow-md rounded-md p-4 relative cursor-pointer hover:scale-105 transition-transform duration-300">
                            {item.is_sale && (
                                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md absolute top-2 left-2">
                                    {item.discount_percent}%
                                </span>
                            )}
                            <button
                                className="absolute top-4 right-2 cursor-pointer"
                                onClick={() => toggleFavorite(item.id)}
                            >
                                <Heart
                                    size={20}
                                    className={`transition-transform duration-300 ${item.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
                                        } ${isAnimated ? 'scale-125' : ''}`}
                                />
                            </button>

                            <Image
                                className="object-cover rounded-md"
                                src={item.image}
                                alt={item.name}
                                width={300}
                                height={300}
                            />
                            <h2 className="text-lg font-bold mt-2">{item.name}</h2>
                            <div className='flex gap-3'><ProductRating rating={item.rating_average} /> {item.rating_average}</div>
                            <div className='flex gap-2 items-center'>
                                {item.is_sale ? (
                                    <div className="flex gap-2 items-center">
                                        <p className="text-red-500 font-bold text-2xl">${item.discountPrice}</p>
                                        <p className="text-gray-500 line-through">${item.price}</p>
                                    </div>
                                ) : (
                                    <p className="text-black     flex items-center text-2xl">${item.price}</p>
                                )}
                            </div>
                            {item.stock_in_quantity > 0 ? (
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
