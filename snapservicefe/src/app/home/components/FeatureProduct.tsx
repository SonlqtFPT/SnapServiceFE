'use client'
import { Progress } from "@/components/ui/progress"
import { AdvType } from "../type/AdvType"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchProducts } from "../../../services/product/ProductService"
import { useEffect, useState } from "react"
import { productListRequest } from "@/model/request/productRequest"
import { ProductListResponse } from "@/model/response/productRespone"
import Link from 'next/link';



const ads: AdvType[] = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/cd/b6/af/cdb6afd935e8020c6955c970bbe2d9a3.jpg",
        description: "Summer promotion",
        title: "50% off on all services in June!",
        status: "carousel",
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/60/c8/92/60c8928cdc85cd3bf9b4d40857d205d9.jpg",
        description: "New service launch",
        title: "Experience our new service with special offers.",
        status: "carousel",
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/be/e8/3d/bee83d5c8f9ffebb8aac9efd98a13fe6.jpg",
        description: "Member exclusive",
        title: "Members receive a 100k voucher instantly.",
        status: "carousel",
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/85/64/55/85645552a71c3f65d95ff43b2b32188f.jpg",
        description: "Referral program",
        title: "Refer a friend and earn exciting rewards.",
        status: "banner",
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/64/8e/ea/648eeacc694bcd399bca9f7a23cc02dc.jpg",
        description: "Weekend flash sale",
        title: "Only valid from 6 PM to 10 PM, limited stock!",
        status: "banner",
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/77/ac/9b/77ac9b9a609a1492e72481eaa61d50b1.jpg",
        description: "Holiday special",
        title: "Enjoy exclusive discounts during the holiday season.",
        status: "banner",
    }
]

export default function FeatureProduct() {

    const [products, setProducts] = useState<ProductListResponse>();
    // const [request, setRequest] = useState<productListRequest>({
    //     page: 1,
    //     pageSize: 10,
    // }); Chỗ này là excample cho ai thắc mắc nếu xài productListRequest trong useState còn tui để 
    // này để lun trong useEffect là vì nó không có chuyển trang

    useEffect(() => {
        const fetchData = async () => {
            const request: productListRequest = {
                page: 1,
                pageSize: 10,
            };
            try {
                const fetchedProducts: ProductListResponse = await fetchProducts(request);
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
            <div className="flex gap-4">
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
                                <img
                                    src={ad.image}
                                    alt={ad.title}
                                    className="w-full h-[365px] object-cover rounded "
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {products?.items
                    // .filter(product => product.available > 0)
                    .slice(5, 9)
                    .map((product, index) => (
                        <Link key={product.id} href={`/products/${product.slug}`}>
                            <div
                                key={index}
                                className="flex flex-col border w-[200px] p-3 hover:shadow rounded cursor-pointer"
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
                                <div className='max-w-60 min-h-10  line-clamp-2 font-semibold text-sm  text-ellipsis hover:text-blue-600 transition-colors mb-2'>
                                    {product.name}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-500 font-semibold">
                                        {/* {product.discount_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
                                        {product.discountPrice} 
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                        {/* {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
                                    </span>
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
                {ads.filter(ads => ads.status === "banner").map((ad) => (
                    <div key={ad.id} className="flex items-center">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className=" w-[400px] h-52  object-cover rounded-md gap-[5px]"
                        />
                    </div>
                ))}
            </div>
        </div >
    )
}
