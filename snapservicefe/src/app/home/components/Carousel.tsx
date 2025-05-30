'use client'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import React from 'react'

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
    }
]
export default function Carousel() {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}

                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                className="w-[500px] rounded-md"
            >
                {ads.map((ad) => (
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
        </div>
    )
}
