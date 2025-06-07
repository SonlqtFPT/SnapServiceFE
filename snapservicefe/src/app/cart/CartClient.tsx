'use client'
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { CartItem, CartSelectionMap, SupplierGroupedItems } from './typeOfCart';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@radix-ui/react-checkbox';
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const initialItems: CartItem[] = [
    {
        id: "1",
        name: "Wireless Headphones",
        created_at: new Date("2025-05-01T10:00:00Z"),
        price: 120.0,
        description: "High-quality wireless headphones with noise cancellation.",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stock_in_quantity: 150,
        rating_average: 4.5,
        sku: "WH-001",
        discountPrice: 100.0,
        discount_percent: 16.7,
        sold_quantity: 500,
        available_quantity: 150,
        is_active: true,
        is_sale: true,
        is_favorite: true,
        slug: "wireless-headphones",
        categories_id: 2,
        supplier_id: 1,
        quantity: 1, // Assuming a default quantity for the cart
    },
    {
        id: "2",
        name: "Gaming Mouse",
        created_at: new Date("2025-04-28T09:30:00Z"),
        price: 45.0,
        description: "Ergonomic gaming mouse with RGB lighting and 6 buttons.",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stock_in_quantity: 300,
        rating_average: 4.2,
        sku: "GM-002",
        discountPrice: 39.0,
        discount_percent: 13.3,
        sold_quantity: 320,
        available_quantity: 180,
        is_active: true,
        is_sale: true,
        is_favorite: false,
        slug: "gaming-mouse",
        categories_id: 3,
        supplier_id: 2,
        quantity: 1, // Assuming a default quantity for the cart
    },
    {
        id: "3",
        name: "Smartphone Stand",
        created_at: new Date("2025-03-15T08:15:00Z"),
        price: 20.0,
        description: "Adjustable metal stand for all smartphones and tablets.",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stock_in_quantity: 500,
        rating_average: 4.7,
        sku: "SS-003",
        discountPrice: 15.0,
        discount_percent: 25.0,
        sold_quantity: 700,
        available_quantity: 350,
        is_active: true,
        is_sale: true,
        is_favorite: false,
        slug: "smartphone-stand",
        categories_id: 5,
        supplier_id: 3,
        quantity: 1, // Assuming a default quantity for the cart
    },
    {
        id: "4",
        name: "Bluetooth Speaker",
        created_at: new Date("2025-02-10T13:20:00Z"),
        price: 60.0,
        description: "Portable Bluetooth speaker with deep bass and long battery life.",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stock_in_quantity: 200,
        rating_average: 4.6,
        sku: "BS-004",
        discountPrice: 50.0,
        discount_percent: 16.7,
        sold_quantity: 450,
        available_quantity: 120,
        is_active: true,
        is_sale: true,
        is_favorite: true,
        slug: "bluetooth-speaker",
        categories_id: 2,
        supplier_id: 2,
        quantity: 1, // Assuming a default quantity for the cart
    },
    {
        id: "5",
        name: "Laptop Cooling Pad",
        created_at: new Date("2025-01-25T11:45:00Z"),
        price: 35.0,
        description: "Ultra-quiet laptop cooling pad with adjustable fan speed.",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stock_in_quantity: 250,
        rating_average: 4.3,
        sku: "CP-005",
        discountPrice: 30.0,
        discount_percent: 14.3,
        sold_quantity: 275,
        available_quantity: 200,
        is_active: true,
        is_sale: true,
        is_favorite: false,
        slug: "laptop-cooling-pad",
        categories_id: 4,
        supplier_id: 1,
        quantity: 1, // Assuming a default quantity for the cart
    },
];

export default function CartClient() {
    const router = useRouter();

    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
    const [selectedItems, setSelectedItems] = useState<CartSelectionMap>({});

    // nhóm sản phẩm theo supplier
    const suppliers: SupplierGroupedItems = {};
    cartItems.forEach((item) => {
        if (!suppliers[item.supplier_id]) {
            suppliers[item.supplier_id] = [];
        }
        suppliers[item.supplier_id].push(item);
    });

    // ccheckbox
    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    const selectedItemList = cartItems.filter((item) => selectedItems[item.id]);
    const subtotal = selectedItemList.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

    // tăng quan
    const handleIncrease = (itemId: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // giảm quan
    const handleDecrease = (itemId: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-8xl font-bold mb-4">🛒</h1>
                <h1 className="text-3xl font-bold mb-4"> Your cart is current empty.</h1>

                <button
                    onClick={() => router.push('/home')}
                    className="bg-[#634C9F] text-white px-6 py-3 rounded-lg text-lg cursor-pointer"
                >
                    ⟵ Quay lại trang chủ
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="text-4xl font-bold mb-6">Shopping Bag</div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-9">
                    <div className=" bg-gray-200 grid grid-cols-12 items-center rounded-t-md p-2">
                        <div className="col-span-5 text-gray-600 font-semibold text-md ml-2">Product</div>
                        <div className="col-span-2 text-center text-gray-600 font-semibold text-md">Price</div>
                        <div className="col-span-2 text-center text-gray-600 font-semibold text-md">Quantity</div>
                        <div className="col-span-2 text-center text-gray-600 font-semibold text-md">Amount</div>
                        <div className="col-span-1 text-center text-gray-600 font-semibold text-md">Delete</div>
                    </div>

                    {Object.entries(suppliers).map(([supplierId, items]) => (
                        <div key={supplierId} className="border p-4 my-4 rounded-md">
                            <h2 className="text-md font-semibold mb-4 text-black">
                                Supplier {supplierId}
                            </h2>

                            {items.map((item) => (
                                <div key={item.id} className="grid grid-cols-12 gap-6 my-2 items-center">
                                    <div className="col-span-5 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedItems[item.id]}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            className="w-5 h-5"
                                        />
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="rounded object-cover"
                                        />
                                        <h3 className="text-md font-semibold">{item.name}</h3>
                                    </div>

                                    <div className="col-span-2 text-center text-sm">
                                        <span className="text-red-500 font-bold">${item.discountPrice}</span>
                                        <div className="text-gray-400 line-through text-sm">${item.price}</div>
                                    </div>

                                    <div className="col-span-2 flex items-center  justify-center gap-2">
                                        <div className='border rounded-4xl w-[90px] text-center'>
                                            <button
                                                className=" px-2 font-bold cursor-pointer"
                                                onClick={() => handleDecrease(item.id)}
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                            >-</button>
                                            <span className='w-[40px]'>{item.quantity}</span>
                                            <button
                                                className="px-2 font-bold cursor-pointer"
                                                onClick={() => handleIncrease(item.id)}
                                                aria-label="Increase quantity"
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="col-span-2  text-center font-semibold">
                                        ${(item.discountPrice * item.quantity)}
                                    </div>

                                    <div className="col-span-1 text-center">
                                        <button
                                            onClick={() =>
                                                setCartItems((prev) =>
                                                    prev.filter((p) => p.id !== item.id)
                                                )
                                            }
                                            className="text-red-500 cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="col-span-3">
                    <div className="sticky top-6 z-10">
                        <div className="text-xl text-center  font-bold rounded-t-md p-2 text-gray-600 bg-gray-200">Summary</div>

                        <div className='rounded-b-md shadow px-4 py-2' >
                            <div className="flex justify-between items-center mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr className="border-dashed border-t-2 border-gray-300 my-4" />
                            <div className="flex justify-between items-center font-bold text-lg mb-6">
                                <span>Total</span>
                                <span>${subtotal}</span>
                            </div>

                            <div className="flex flex-col items-center space-y-3">
                                {subtotal > 0 && (
                                    <button
                                        className="w-[80%] bg-[#634C9F] text-white py-2 rounded-4xl text-lg cursor-pointer"
                                        onClick={() => router.push('/checkout')}
                                    >
                                        Proceed to Checkout ⟶
                                    </button>
                                )}
                                <button className="w-[80%] bg-gray-100 text-[#634C9F] py-2 rounded-4xl text-lg cursor-pointer"
                                    onClick={() => router.push('/home')}
                                >
                                    ⟵ Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}