'use client'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { CategoryType } from '@/types/product/CategoryType'

export default function Category() {
     const categories: CategoryType[] =[
    {
      id: 1,
      name: 'Category 1',
      slug: 'category-1'
    },
    {
      id: 2,
      name: 'Category 2',
      slug: 'category-2'
    },
    {
      id: 3,
      name: 'Category 3',
      slug: 'category-3'
    }
  ]
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
