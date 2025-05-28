'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"


const fakeNewProducts = [
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 500000,
    salePrice: 350000,
    discountPercent: 30,
    sold: 120,
    available: 30,
    stock: 150
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 800000,
    salePrice: 640000,
    discountPercent: 20,
    sold: 80,
    available: 15,
    stock: 95
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1200000,
    salePrice: 900000,
    discountPercent: 25,
    sold: 200,
    available: 50,
    stock: 250
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 300000,
    salePrice: 210000,
    discountPercent: 30,
    sold: 60,
    available: 10,
    stock: 70
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1500000,
    salePrice: 1200000,
    discountPercent: 20,
    sold: 45,
    available: 5,
    stock: 50
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 400000,
    salePrice: 320000,
    discountPercent: 20,
    sold: 100,
    available: 25,
    stock: 125
  },
  {
    name: "Product 7",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 600000,
    salePrice: 480000,
    discountPercent: 20,
    sold: 70,
    available: 20,
    stock: 90
  },
  {
    name: "Product 8",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1000000,
    salePrice: 700000,
    discountPercent: 30,
    sold: 150,
    available: 40,
    stock: 190
  }
]

const ads = [
  {
    id: 1,
    image: "https://1.bp.blogspot.com/-SoZlEU-8DXA/YOP8tPSO2EI/AAAAAAAIEJo/0mw1SH8614U170F4fPrMXRUZ1PAKEbWIQCLcBGAsYHQ/s1600/Fruzo-03.png",
    description: "Summer promotion",
    title: "50% off on all services in June!",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/45/47/d2/4547d29e55eacaf3557c87ab0900c2e1.jpg",
    description: "New service launch",
    title: "Experience our new service with special offers.",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/7d/5d/4a/7d5d4a6e40b4d13697ce6d90a810e47c.jpg",
    description: "Member exclusive",
    title: "Members receive a 100k voucher instantly.",
  }
]
export default function NewProduct() {
  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {fakeNewProducts.slice(0, 6).map((product, index) => (
          <div
            key={index}
            className="flex flex-col border p-3 hover:shadow rounded"
          >
            <div className="relative mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="h-[200px] w-full object-cover rounded"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                  {product.discountPercent}%
                </span>
              )}
            </div>
            <div className='max-w-60 min-h-10  line-clamp-2 font-semibold text-sm  text-ellipsis hover:text-blue-600 transition-colors mb-2'>
              {product.name}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 font-semibold">
                {product.salePrice.toLocaleString()}₫
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}₫
              </span>
            </div>
            <hr className="my-2 border-gray-200" />
            <span className="text-xs text-gray-400">This product is about to run out</span>
            <div className="flex justify-between w-full text-xs text-gray-500">
              <Progress
                value={(product.sold / product.stock) * 100}
                className="w-full h-2 mt-1 mb-2"
              />
              {/* <span>Đã bán: {product.sold}</span> */}
            </div>
            <span className="text-gray-500 text-xs">Available only:<span className="text-black font-bold italic text-sm" > {product.stock}</span></span>
          </div>
        ))}
      </div>
      <div className="adv mt-5 flex justify-between">
                {ads.slice(0, 3).map((ad) => (
                    <div key={ad.id} className="flex items-center">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className=" w-[400px] h-52  object-cover rounded gap-[5px]"
                        />
                    </div>
                ))}
            </div>
    </div>
  )
}
