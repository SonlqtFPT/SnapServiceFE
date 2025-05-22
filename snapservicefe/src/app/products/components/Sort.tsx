import React from 'react'

export default function Sort() {
    return (
        <div className='bg-gray-100 p-2 flex text-gray-500'>
            <div className='flex justify-between w-[70%]'>
                <div className=''>Showing 1-20 of 34 result</div>
                <div>Sort: <strong className='text-black'>Sort by latest</strong></div>
            </div>
            <div className='flex justify-end w-[30%] gap-2'>
                | Show:<strong className='text-black'>20 item</strong> 
            </div>
        </div>
    )
}
