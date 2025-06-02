'use client'
import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect, useState } from 'react'
import { CategoryType } from '@/types/product/CategoryType'
import { fetchCategories } from '@/services/product/ProductService'
import Image from 'next/image'

export default function Category() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
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
        <div className='flex flex-col gap-2'>
            <div>Product Category</div>
            <div className='flex flex-col gap-2'>
                <div className="flex items-center gap-2">
                    <Checkbox id="all" />
                    <label htmlFor="all" className="text-black font-bold">
                        All
                    </label>
                </div>
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                        <Image src={category.imageUrl} alt={category.name} width={20} height={20} /> 
                        <Checkbox id={category.slug} />
                        <label htmlFor={category.slug} className="text-gray-500">
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
