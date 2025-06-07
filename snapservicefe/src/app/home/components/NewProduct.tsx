'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { ProductType } from '../../../types/product/ProductType'
import { productListRequest } from "@/model/request/productRequest"
import { ProductListResponse } from "@/model/response/productRespone"
import { fetchProducts } from "../../../services/product/ProductService"
import { use, useEffect, useState } from "react"
import Link from 'next/link'



// const products: ProductType[] = [
//     {
//         id: "1",
//         name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
//         image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
//         price: 500000,
//         discount_price: 350000,
//         discount_percent: 30,
//         sold_quantity: 120,
//         available_quantity: 30,
//         stock_in_quantity: 150,
//         rating_average: 4.5,
//         is_active: true,
//         is_sale: true,
//         is_favorite: false,
//         categories_id: 1,
//         supplier_id: 1,
//     },
//     {
//         id: "2",
//         name: "Pepperoni Feast Pizza",
//         image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=400&q=80",
//         price: 800000,
//         discount_price: 640000,
//         discount_percent: 20,
//         sold_quantity: 80,
//         available_quantity: 15,
//         stock_in_quantity: 95,
//         rating_average: 4.0,
//         is_active: true,
//         is_sale: true,
//         is_favorite: true,
//         categories_id: 1,
//         supplier_id: 2,
//     },
//     {
//         id: "3",
//         name: "BBQ Chicken Pizza",
//         image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400&q=80",
//         price: 1200000,
//         discount_price: 900000,
//         discount_percent: 25,
//         sold_quantity: 200,
//         available_quantity: 50,
//         stock_in_quantity: 250,
//         rating_average: 3.0,
//         is_active: true,
//         is_sale: false,
//         is_favorite: false,
//         categories_id: 2,
//         supplier_id: 1,
//     },
//     {
//         id: "4",
//         name: "Veggie Lovers Pizza",
//         image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=400&q=80",
//         price: 300000,
//         discount_price: 210000,
//         discount_percent: 30,
//         sold_quantity: 60,
//         available_quantity: 10,
//         stock_in_quantity: 70,
//         rating_average: 3.5,
//         is_active: false,
//         is_sale: true,
//         is_favorite: true,
//         categories_id: 2,
//         supplier_id: 3,
//     },
//     {
//         id: "5",
//         name: "Seafood Deluxe Pizza",
//         image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&q=80",
//         price: 1500000,
//         discount_price: 1200000,
//         discount_percent: 20,
//         sold_quantity: 45,
//         available_quantity: 5,
//         stock_in_quantity: 50,
//         rating_average: 4.8,
//         is_active: true,
//         is_sale: false,
//         is_favorite: false,
//         categories_id: 3,
//         supplier_id: 2,
//     },
//     {
//         id: "6",
//         name: "Hawaiian Pizza",
//         image: "https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&w=400&q=80",
//         price: 400000,
//         discount_price: 320000,
//         discount_percent: 20,
//         sold_quantity: 125,
//         available_quantity: 0,
//         stock_in_quantity: 125,
//         rating_average: 4.2,
//         is_active: false,
//         is_sale: true,
//         is_favorite: true,
//         categories_id: 1,
//         supplier_id: 1,
//     },
//     {
//         id: "7",
//         name: "Four Cheese Pizza",
//         image: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress&w=400&q=80",
//         price: 600000,
//         discount_price: 480000,
//         discount_percent: 20,
//         sold_quantity: 70,
//         available_quantity: 20,
//         stock_in_quantity: 90,
//         rating_average: 4.1,
//         is_active: true,
//         is_sale: false,
//         is_favorite: false,
//         categories_id: 2,
//         supplier_id: 3,
//     },
//     {
//         id: "8",
//         name: "Spicy Sausage Pizza",
//         image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&q=80",
//         price: 1000000,
//         discount_price: 700000,
//         discount_percent: 30,
//         sold_quantity: 150,
//         available_quantity: 0,
//         stock_in_quantity: 190,
//         rating_average: 4.7,
//         is_active: true,
//         is_sale: true,
//         is_favorite: true,
//         categories_id: 3,
//         supplier_id: 2,
//     },
// ]

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
  const [products, setProducts] = useState<ProductListResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const request: productListRequest = {
        page: 4,
        pageSize: 15,
      };
      try {
        const fetchedProducts: ProductListResponse[] = await fetchProducts(request);
        setProducts(fetchedProducts);
        console.log("Fetched products:", fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

  }, [])
  return (
    <div className="">
      <div className="grid grid-cols-6 gap-4 cursor-pointer">
        {products.slice(7, 13).map((product, index) => (
          <Link key={index} href={`/products/${product.slug}`}>
          <div
            key={index}
            className="flex flex-col border p-3 hover:shadow rounded"
          >
            <div className="relative mb-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[200px] w-full object-cover rounded"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                  {product.discountPercent}%
                </span>
              )}
            </div>
            <div className='max-w-60 min-h-10  line-clamp-2 font-semibold text-sm  text-ellipsis mb-2  '>
              {product.name}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 font-semibold">
                {product.discountPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
            </div>
            <hr className="my-2 border-gray-200" />
            <span className="text-xs text-gray-400">This product is about to run out</span>
            <div className="flex justify-between w-full text-xs text-gray-500">
              <Progress
                value={(product.soldQuantity / product.stockInQuantity) * 100}
                className="w-full h-2 mt-1 mb-2"
              />
              {/* <span>Đã bán: {product.sold}</span> */}
            </div>
            <span className="text-gray-500 text-xs">Available only:<span className="text-black font-bold italic text-sm" > {product.stockInQuantity}</span></span>
          </div>
          </Link>
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
