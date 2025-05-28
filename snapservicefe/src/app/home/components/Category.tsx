'use client'
import React from 'react'
const fakeCategories = [
    {
        name: "Electronics",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Books",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Clothing",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Home",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Toys",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Sports",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Beauty",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    },
    {
        name: "Automotive",
        image: "https://img.thecdn.in/37982/1679980892087_WhatsAppImage20230327at94648PM2.jpeg?width=384&format=webp"
    }
];
export default function Category() {
  return (
    <div className="">
  <div className="grid grid-cols-8 mb-5">
    {fakeCategories.map((category, index) => {
      const isFirst = index === 0;
      const isLast = index === fakeCategories.length - 1;
      return (
        <div
          key={index}
          className={`
            flex flex-col items-center border p-3 hover:shadow transition 
            ${isFirst ? 'rounded-l-md' : ''} 
            ${isLast ? 'rounded-r-md' : ''}
          `}
        > {/* để chỉ ô đầu cuối bo góc */}
          <img
            src={category.image}
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
