'use client'
import React from 'react'
import { fetchCategories } from '@/services/product/ProductService'
import { useEffect, useState } from "react"
import { CategoryResponse } from '@/model/response/categoryResponse'

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
          const isFirst = index === 0;
          const isLast = index === categories.length - 1;
          return (
            <div
              key={index}
              className={`
            flex flex-col items-center border p-3 hover:shadow transition 
           
          `}
          //  ${isFirst ? 'rounded-l-md' : ''} 
          //   ${isLast ? 'rounded-r-md' : ''}
            > {/* để chỉ ô đầu cuối bo góc */}
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-24 h-24 object-contain mb-2"
              />
              <span className="text-sm font-medium text-center">{category.name}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-5">
        <img
          src="https://vi.amoybrand.com/storage/uploads/images/202309/04/a4e0a2f1019bfde4d98664125b6384a0.jpg"
          alt="category"
          className="w-full h-24 rounded object-cover"
        />
      </div>
    </div>

  )
}
