'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const fakeNewProducts = [
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 500000,
        salePrice: 350000,
        discountPercent: 30,
        sold: 120,
        available: 30,
        stock: 150,
        rate: 4.5
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 800000,
        salePrice: 640000,
        discountPercent: 20,
        sold: 80,
        available: 15,
        stock: 95,
        rate: 4.0
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 1200000,
        salePrice: 900000,
        discountPercent: 25,
        sold: 200,
        available: 50,
        stock: 250,
        rate: 3.0
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 300000,
        salePrice: 210000,
        discountPercent: 30,
        sold: 60,
        available: 10,
        stock: 70,
        rate: 3.5
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 1500000,
        salePrice: 1200000,
        discountPercent: 20,
        sold: 45,
        available: 5,
        stock: 50,
        rate: 4.8
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 400000,
        salePrice: 320000,
        discountPercent: 20,
        sold: 125,
        available: 0,
        stock: 125,
        rate: 4.2
    },
    {
        name: "Product 7",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80",
        originalPrice: 600000,
        salePrice: 480000,
        discountPercent: 20,
        sold: 70,
        available: 20,
        stock: 90,
        rate: 4.1
    },
    {
        name: "Product 8",
        image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400&q=80",
        originalPrice: 1000000,
        salePrice: 700000,
        discountPercent: 30,
        sold: 150,
        available: 0,
        stock: 190,
        rate: 4.7
    }
]

const ads = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/71/62/81/716281de45193a8ed4846269be62127d.jpg",
        description: "Summer promotion",
        title: "50% off on all services in June!",
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/6e/d4/9f/6ed49f711daeaa2afb306494b71b3757.jpg",
        description: "New service launch",
        title: "Experience our new service with special offers.",
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/95/5a/e2/955ae22ec75eb0850751677555a164e6.jpg",
        description: "Member exclusive",
        title: "Members receive a 100k voucher instantly.",
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/17/1b/f6/171bf6f16a3d9f284ad2275b41b80368.jpg",
        description: "Summer promotion",
        title: "50% off on all services in June!",
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/12/d7/61/12d76180ac22a6626fda20879395c3c7.jpg",
        description: "New service launch",
        title: "Experience our new service with special offers.",
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/12/d7/61/12d76180ac22a6626fda20879395c3c7.jpg",
        description: "Member exclusive",
        title: "Members receive a 100k voucher instantly.",
    }
]


export default function NewArrivals() {
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
                                {ads.slice(0,3).map((ad) => (
                                    <SwiperSlide key={ad.id}>
                                        <div className="flex gap-2  w-[500px] items-center rounded">
                                            <img
                                                src={ad.image}
                                                alt={ad.title}
                                                className="w-full h-[365px] object-cover rounded "
                                            />
                
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                {fakeNewProducts
                    .filter(product => product.available > 0)
                    .slice(0, 4)
                    .map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col border w-[250px] p-3 hover:shadow rounded"
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
                            <div className="flex justify-between w-full text-xs text-gray-500">
                                <Progress
                                    value={(product.sold / product.stock) * 100}
                                    className="w-full h-2 mt-1 mb-2"
                                />
                            </div>
                            <div className='flex justify-between'>
                                <span className="text-gray-500 text-xs">Available only:
                                    <span className="text-black font-bold italic text-xs" > {product.stock}</span>
                                </span>
                                <span className='text-gray-500 text-xs'>rating:
                                    <span className='text-black font-bold italic text-xs'> {product.rate}</span>
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="adv mt-5 flex justify-between">
                {ads.slice(3, 5).map((ad) => (
                    <div key={ad.id} className="flex items-center">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className=" w-[600px] h-60  object-cover rounded "
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
