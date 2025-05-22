import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const adsData = [
    {
        id: 1,
        title: "Khuyến mãi mùa hè",
        image: "https://i.pinimg.com/736x/9b/61/ae/9b61ae53a888f56004c13e62596bb077.jpg",
        description: "Giảm giá 50% cho tất cả dịch vụ trong tháng 6!",
    },
    {
        id: 2,
        title: "Dịch vụ mới ra mắt",
        image: "https://i.pinimg.com/736x/b9/69/0a/b9690ac7ec4b7c94d44d9e519b6c30e7.jpg",
        description: "Trải nghiệm dịch vụ mới với ưu đãi hấp dẫn.",
    },
    {
        id: 3,
        title: "Ưu đãi thành viên",
        image: "https://i.pinimg.com/736x/97/80/69/978069390e94fe9d74510a93911af680.jpg",
        description: "Thành viên nhận ngay voucher 100k.",
    },
    {
        id: 4,
        title: "Giới thiệu bạn bè",
        image: "https://i.pinimg.com/736x/13/f3/ba/13f3ba5ff82b58d053423a1decc8e196.jpg",
        description: "Giới thiệu bạn nhận thưởng hấp dẫn.",
    },
    {
        id: 5,
        title: "Flash Sale cuối tuần",
        image: "https://i.pinimg.com/736x/dd/1c/ff/dd1cff06e41bbe14fd715dd01edff398.jpg",
        description: "Chỉ áp dụng từ 18h-22h, số lượng có hạn!",
    },
]
export default function Banner() {
    return (
        <div>
            <div className="flex justify-center items-center ">
                <Carousel className=" max-w-6xl">
                    <CarouselContent className="">
                        {adsData.map((ad) => (
                            <CarouselItem key={ad.id}>
                                <Card className="w-full border-none ">
                                    <CardContent className="flex flex-col items-center justify-center aspect-square max-h-[400px] ">
                                        <img src={ad.image} alt={ad.title} className="w-full max-h-[400px] object-cover rounded " />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            
        </div>
    )
}
