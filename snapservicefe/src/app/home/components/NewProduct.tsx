import React from 'react'

const fakeNewProducts = [
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 500000,
    salePrice: 350000,
    discountPercent: 30,
    sold: 120,
    available: 30
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 800000,
    salePrice: 640000,
    discountPercent: 20,
    sold: 80,
    available: 15
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1200000,
    salePrice: 900000,
    discountPercent: 25,
    sold: 200,
    available: 50
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 300000,
    salePrice: 210000,
    discountPercent: 30,
    sold: 60,
    available: 10
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1500000,
    salePrice: 1200000,
    discountPercent: 20,
    sold: 45,
    available: 5
  },
  {
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 400000,
    salePrice: 320000,
    discountPercent: 20,
    sold: 100,
    available: 25
  },
  {
    name: "Product 7",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
    originalPrice: 600000,
    salePrice: 480000,
    discountPercent: 20,
    sold: 70,
    available: 20
  },
  {
    name: "Product 8",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400&q=80",
    originalPrice: 1000000,
    salePrice: 700000,
    discountPercent: 30,
    sold: 150,
    available: 40
  }
]
export default function NewProduct() {
  return (
    <div className="">
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
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                  -{product.discountPercent}%
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
              <span>Đã bán: {product.sold}</span>
              <span>Còn: {product.available}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
