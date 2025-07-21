'use client'
import React from 'react'
import { fetchCategories } from '@/services/product/ProductService'
import { useEffect, useState } from "react"
import { CategoryResponse } from '@/model/response/categoryResponse'
import Image from 'next/image'

export default function Category() {
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
    <div >
      <div className="grid grid-cols-6 mb-5">
        {categories.map((category, index) => {
          const total = categories.length;
          const cols = 6;

          const isTopLeft = index === 0;
          const isTopRight = index === cols - 1;
          const isBottomLeft = index === total - cols;
          const isBottomRight = index === total - 1;

          return (
            <div
              key={index}
              className={`
          flex flex-col items-center border p-3 hover:shadow transition
          ${isTopLeft ? 'rounded-tl-md' : ''}
          ${isTopRight ? 'rounded-tr-md' : ''}
          ${isBottomLeft ? 'rounded-bl-md' : ''}
          ${isBottomRight ? 'rounded-br-md' : ''}
        `}
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={96}
                height={96}
                className="w-24 h-24 object-contain mb-2"
              />
              <span className="text-sm font-medium text-center">{category.name}</span>
            </div>
          );
        })}
      </div>


      <div className="mb-5">
        <Image
          src="https://vi.amoybrand.com/storage/uploads/images/202309/04/a4e0a2f1019bfde4d98664125b6384a0.jpg"
          alt="category"
          width={1200}
          height={100}
          className="w-full h-24 rounded object-cover"
        />
      </div>
    </div>

  )
}
