'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const adsData = [
    {
        id: 1,
        title: "Khuyến mãi mùa hè",
        image: "https://images.squarespace-cdn.com/content/v1/57e1928bcd0f687b55ea0e2d/1569887522826-WVO9NQ21GUCLTCLE0218/kj_balmain_hp.png?format=2500w",
        description: "Giảm giá 50% cho tất cả dịch vụ trong tháng 6!",
    },
    {
        id: 2,
        title: "Dịch vụ mới ra mắt",
        image: "https://www.shoeshowmega.com/on/demandware.static/-/Library-Sites-ShoeShowSharedLibrary/default/dwd5ed15ca/images/homepage/shoeshow/quarter12025/shoe-show-heydude-banner-promo-banner-desktop-retina.jpg",
        description: "Trải nghiệm dịch vụ mới với ưu đãi hấp dẫn.",
    },
    {
        id: 3,
        title: "Ưu đãi thành viên",
        image: "https://nilsonline.lk/image/cache/catalog/nils/product/Home%20Page%20Slideshow%20Live/11.11-2880x1180.jpg",
        description: "Thành viên nhận ngay voucher 100k.",
    }
]


export default function Banner() {
    
    return (
        <div className=" mx-auto mb-5">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={false}
                className="mySwiper"
            >
                {adsData.map((ad) => (
                    <SwiperSlide key={ad.id}>
                        <div className="flex justify-center items-center max-h-[400px]">
                            <img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full max-h-[400px] object-cover rounded"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
