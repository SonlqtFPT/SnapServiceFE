'use client'
import { ProductListResponse } from '@/model/response/productRespone';
import React from 'react'

type Props = {
    products: ProductListResponse;
};

export default function Sort({products}: Props) {
    return (
        <div className='bg-gray-100 p-2 flex text-gray-500'>
            <div className='flex justify-between w-[70%]'>
                <div className=''>Found <strong className='text-black'>{products?.totalItems}</strong> result</div>
                <div>Sort: <strong className='text-black'>Sort by latest</strong></div>
            </div>
            <div className='flex justify-end w-[30%] gap-2 items-center'>
                | Show per page:<strong className='text-black flex items-center'>{products?.pageSize}</strong> 
            </div>
        </div>
    )
}
