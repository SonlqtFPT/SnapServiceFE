'use client'
import React, { useEffect, useState } from 'react'
import { fetchCategories } from '@/services/product/ProductService'
import Image from 'next/image'
import { CategoryResponse } from '@/model/response/categoryResponse'

// Category Item Skeleton
const CategoryItemSkeleton = () => (
    <div className="flex items-center gap-2 py-1 animate-pulse">
        <div className="w-[30px] h-[30px] bg-gray-300 rounded-2xl"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>
)

// Category Skeleton Component
const CategorySkeleton = () => (
    <div className='flex flex-col gap-2 border border-gray-200 p-4 rounded-md bg-white shadow-md h-157'>
        {/* Category title skeleton */}
        <div className="flex justify-center py-1">
            <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* Category items skeleton */}
        <div className='flex flex-col gap-2 mt-2'>
            {[...Array(8)].map((_, index) => (
                <CategoryItemSkeleton key={index} />
            ))}
        </div>
    </div>
)

type Props = {
    onSelectCategory?: (id: number | null) => void;
};

export default function Category({ onSelectCategory }: Props) {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getCategories = async () => {
        try {
            setIsLoading(true);
            const response = await fetchCategories();
            setCategories(response);
            console.log("Fetched categories:", response);
            return response;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return [];
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return <CategorySkeleton />;
    }

    return (
        <div className='flex flex-col gap-2 border border-gray-200 p-4 rounded-md bg-white shadow-md h-157'>
            <button 
                className='flex justify-center text-2xl font-bold cursor-pointer hover:bg-gray-100 py-1 rounded-md transition-colors duration-200' 
                onClick={() => onSelectCategory?.(null)}
            >
                Category
            </button>
            <div className='flex flex-col gap-2'>
                {categories.map((category) => (
                    <button 
                        key={category.id} 
                        onClick={() => onSelectCategory?.(category.id)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 rounded-md transition-colors duration-200"
                    >
                        <div className="w-[30px] h-[30px] relative">
                            <Image 
                                src={category.imageUrl} 
                                alt={category.name} 
                                fill 
                                className='rounded-2xl object-cover' 
                            />
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