'use client'
import Category from './components/Category'
import Card from './components/Card'
import { useState } from 'react'
import { DynamicBreadcrumbs } from '@/components/DynamicBreadcrumbs'


export default function ProductsClient() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
    
  return (
    <div className="flex flex-col gap-6 px-15">
      <DynamicBreadcrumbs />

      <div className="flex gap-4">
        <div className="w-[20%] sticky top-5 h-full">
          <Category onSelectCategory={setSelectedCategoryId} />
        </div>
        <div className="flex flex-col w-[80%] gap-5">
          <Card categoryId={selectedCategoryId} />
        </div>
      </div>
    </div>
  )
}
