'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { productListRequest } from "@/model/request/productRequest"
import { ItemResponse, ProductListResponse } from "@/model/response/productRespone"
import { fetchProducts } from "../../../services/product/ProductService"
import { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image';



const ads = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/71/62/81/716281de45193a8ed4846269be62127d.jpg",
        description: "Summer promotion",
        title: "50% off on all services in June!",
        status: "carousel",
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/6e/d4/9f/6ed49f711daeaa2afb306494b71b3757.jpg",
        description: "New service launch",
        title: "Experience our new service with special offers.",
        status: "carousel",
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/95/5a/e2/955ae22ec75eb0850751677555a164e6.jpg",
        description: "Member exclusive",
        title: "Members receive a 100k voucher instantly.",
        status: "carousel",
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/17/1b/f6/171bf6f16a3d9f284ad2275b41b80368.jpg",
        description: "Summer promotion",
        title: "50% off on all services in June!",
        status: "banner",
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/12/d7/61/12d76180ac22a6626fda20879395c3c7.jpg",
        description: "New service launch",
        title: "Experience our new service with special offers.",
        status: "banner",
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/12/d7/61/12d76180ac22a6626fda20879395c3c7.jpg",
        description: "Member exclusive",
        title: "Members receive a 100k voucher instantly.",
        status: "banner",
    }
]


export default function NewArrivals() {
    const [products, setProducts] = useState<ItemResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const request: productListRequest = {
                page: 3,
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
            <div className="flex gap-4">
                {/* <Carousel /> */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    className="w-[500px] rounded-md"
                >
                    {ads.filter(ads => ads.status === "carousel").map((ad) => (
                        <SwiperSlide key={ad.id}>
                            <div className="flex gap-2  w-[500px] items-center rounded">
                                <Image
                                    src={ad.image}
                                    alt={ad.title}
                                    width={1200}
                                    height={365}
                                    className="w-full h-[365px] object-cover rounded"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {products
                    // .filter(product => product.stockInQuantity > 0)
                    .slice(6, 10)
                    .map((product, index) => (
                        <Link key={product.id} href={`/products/${product.slug}`}>

                            <div
                                key={index}
                                className="flex flex-col border w-[200px] p-3 hover:shadow rounded cursor-pointer"
                            >
                                <div className="relative mb-2">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={400} // thay bằng width thực tế bạn mong muốn
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
                                                {product.discountPrice.toLocaleString()} đ
                                            </span>
                                            <span className="text-xs text-gray-400 line-through">
                                                {product.price.toLocaleString()} đ
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-black font-semibold">
                                            {product.price.toLocaleString()} đ
                                        </span>
                                    )}
                                </div>

                                <hr className="my-2 border-gray-200" />
                                <div className="flex justify-between w-full text-xs text-gray-500">
                                    <Progress
                                        value={(product.soldQuantity / product.stockInQuantity) * 100}
                                        className="w-full h-2 mt-1 mb-2"
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <span className="text-gray-500 text-xs">Available only:
                                        <span className="text-black font-bold italic text-xs" > {product.stockInQuantity}</span>
                                    </span>
                                    <span className='text-gray-500 text-xs'>rating:
                                        <span className='text-black font-bold italic text-xs'> {product.ratingAverage}</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
            <div className="adv mt-5 flex justify-between">
                {ads.slice(3, 5).map((ad) => (
                    <div key={ad.id} className="flex items-center">
                        <Image
                            src={ad.image}
                            alt={ad.title}
                            width={600}
                            height={240} // tương đương h-60
                            className="w-[600px] h-60 object-cover rounded"
                        />

                    </div>
                ))}
            </div>
        </div>
    )
}
