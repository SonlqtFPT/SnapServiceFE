'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { productListRequest } from "@/model/request/productRequest"
import { ItemResponse, ProductListResponse } from "@/model/response/productRespone"
import { fetchProducts } from "../../../services/product/ProductService"
import { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image';


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
  const [products, setProducts] = useState<ItemResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const request: productListRequest = {
        page: 4,
        pageSize: 15,
      };
      try {
        const fetchedProducts: ProductListResponse = await fetchProducts(request);
        setProducts(fetchedProducts.items || []);
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
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={200}
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
                {product.discountPercent > 0 ? (
                  <>
                    <span className="text-red-500 font-semibold">
                      {product.discountPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </>
                ) : (
                  <span className="text-black font-semibold">
                    {product.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                )}
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
            <Image
              src={ad.image}
              alt={ad.title}
              width={400}
              height={208} // h-52 ~ 208px
              className="w-[400px] h-52 object-cover rounded gap-[5px]"
            />

          </div>
        ))}
      </div>
    </div>
  )
}
