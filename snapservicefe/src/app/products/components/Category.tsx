'use client'
import React, { useEffect, useState } from 'react'
import { fetchCategories } from '@/services/product/ProductService'
import Image from 'next/image'
import { CategoryResponse } from '@/model/response/categoryResponse'

type Props = {
    onSelectCategory?: (id: number | null) => void;
};

export default function Category({ onSelectCategory }: Props) {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const getCategories = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response);
            console.log("Fetched categories:", response);
            return response;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return [];
        }
    }
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className='flex flex-col gap-2 border border-gray-200 p-4 rounded-md bg-white shadow-md h-157'>
            <button className='flex justify-center text-2xl font-bold cursor-pointer hover:bg-gray-100 py-1 rounded-md' onClick={() => onSelectCategory?.(null)}>Category</button>
            <div className='flex flex-col gap-2'>
                {categories.map((category) => (
                    <button key={category.id} onClick={() => onSelectCategory?.(category.id)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 rounded-md">
                        <div className="w-[30px] h-[30px] relative">
                            <Image src={category.imageUrl} alt={category.name} fill className='rounded-2xl' />
                        </div>
                        <div className="text-gray-500">
                            {category.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
