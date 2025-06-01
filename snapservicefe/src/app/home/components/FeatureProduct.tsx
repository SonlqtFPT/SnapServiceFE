'use client'
import { Progress } from "@/components/ui/progress"
import { ProductType } from "../../../types/product/ProductType"
import { AdvType } from "../type/AdvType"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchProducts} from "../../../services/product/ProductService"
import { use, useEffect, useState } from "react"

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

const ads: AdvType[] =  [
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
 
const [products, setProducts] = useState<ProductType[]>([]); 

useEffect(() => {
    const fetchData = async () => {
        try {
            const fetchedProducts: ProductType[] = await fetchProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchData();
    console.log("Fetched products:", products);

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
                    {ads.filter(ads => ads.status==="carousel").map((ad) => (
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
                {products
                    // .filter(product => product.available > 0)
                    .slice(0, 4)
                    .map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col border w-[250px] p-3 hover:shadow rounded cursor-pointer"
                        >
                            <div className="relative mb-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-[200px] w-full object-cover rounded"
                                />
                                {product.discount_percent > 0 && (
                                    <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                                        {product.discount_percent}%
                                    </span>
                                )}
                            </div>
                            <div className='max-w-60 min-h-10  line-clamp-2 font-semibold text-sm  text-ellipsis hover:text-blue-600 transition-colors mb-2'>
                                {product.name}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-red-500 font-semibold">
                                   {/* {product.discount_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
                                   {product.discountPrice} sometihnfg
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                    {/* {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
                                </span>
                            </div>
                            <hr className="my-2 border-gray-200" />
                            <div className="flex justify-between w-full text-xs text-gray-500">
                                <Progress
                                    value={(product.sold_quantity / product.stock_in_quantity) * 100}
                                    className="w-full h-2 mt-1 mb-2"
                                />
                            </div>
                            <div className='flex justify-between'>
                                <span className="text-gray-500 text-xs">Available only:
                                    <span className="text-black font-bold italic text-xs" > {product.stock_in_quantity}</span>
                                </span>
                                <span className='text-gray-500 text-xs'>rating:
                                    <span className='text-black font-bold italic text-xs'> {product.rating_average}</span>
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="adv mt-5 flex justify-between">
                {ads.filter(ads=>ads.status==="banner").map((ad) => (
                    <div key={ad.id} className="flex items-center">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className=" w-[400px] h-52  object-cover rounded-md gap-[5px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
