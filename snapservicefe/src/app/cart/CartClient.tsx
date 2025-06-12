'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { CartItem, SupplierGroupedItems } from './typeOfCart';
import { useRouter } from 'next/navigation';
import CartSumary from '@/components/CartSumary';
// import { Checkbox } from '@radix-ui/react-checkbox';
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const fakeData: CartItem[] = [
    {
        id: "1",
        name: "Wireless Headphones",
        createdAt: new Date("2025-05-01T10:00:00Z"),
        price: 120.0,
        description: "High-quality wireless headphones with noise cancellation.",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stockInQuantity: 150,
        ratingAverage: 4.5,
        sku: "WH-001",
        discountPrice: 100.0,
        discountPercent: 16.7,
        soldQuantity: 500,
        availableQuantity: 150,
        isActive: true,
        isSale: true,
        slug: "wireless-headphones",
        categoriesId: 2,
        supplierId: 1,
        quantity: 1, // Assuming a default quantity for the cart
        isChecked: false, // Assuming a default unchecked state for the checkbox
    },
    {
        id: "2",
        name: "Smartphone",
        createdAt: new Date("2025-05-02T10:00:00Z"),
        price: 800.0,
        description: "Latest model smartphone with advanced features.",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stockInQuantity: 200,
        ratingAverage: 4.7,
        sku: "SP-002",
        discountPrice: 750.0,
        discountPercent: 6.25,
        soldQuantity: 300,
        availableQuantity: 200,
        isActive: true,
        isSale: true,
        slug: "smartphone",
        categoriesId: 3,
        supplierId: 2,
        quantity: 1, // Assuming a default quantity for the cart
        isChecked: false, // Assuming a default unchecked state for the checkbox
    },
    {
        id: "3",
        name: "Laptop",
        createdAt: new Date("2025-05-03T10:00:00Z"),
        price: 1500.0,
        description: "High-performance laptop for gaming and work.",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stockInQuantity: 100,
        ratingAverage: 4.8,
        sku: "LP-003",
        discountPrice: 1400.0,
        discountPercent: 6.67,
        soldQuantity: 200,
        availableQuantity: 100,
        isActive: true,
        isSale: true,
        slug: "laptop",
        categoriesId: 4,
        supplierId: 1,
        quantity: 1, // Assuming a default quantity for the cart
        isChecked: false, // Assuming a default unchecked state for the checkbox
    },
    {
        id: "4",
        name: "Smartwatch",
        createdAt: new Date("2025-05-04T10:00:00Z"),
        price: 250.0,
        description: "Stylish smartwatch with fitness tracking features.",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w",
        stockInQuantity: 300,
        ratingAverage: 4.3,
        sku: "SW-004",
        discountPrice: 200.0,
        discountPercent: 20.0,
        soldQuantity: 400,
        availableQuantity: 300,
        isActive: true,
        isSale: true,
        slug: "smartwatch",
        categoriesId: 5,
        supplierId: 4,
        quantity: 1, // Assuming a default quantity for the cart
        isChecked: false, // Assuming a default unchecked state for the checkbox
    },
];

export default function CartClient() {
    const router = useRouter();
    const initialItems = localStorage.getItem('cart');
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems ? JSON.parse(initialItems) : []);

    // nhóm sản phẩm theo supplier
    const suppliers: SupplierGroupedItems = {};
    cartItems.forEach((item) => {
        if (!suppliers[item.supplierId]) {
            suppliers[item.supplierId] = [];
        }
        suppliers[item.supplierId].push(item);
    });

    // ccheckbox
    const handleCheckboxChange = (itemId: string) => {
        const updatedItems = cartItems.map(item =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
        );
        setCartItems(updatedItems);
    };



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
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    useEffect(() => {
        const existing = localStorage.getItem('cart');

        if (existing) {
            setCartItems(JSON.parse(existing));
        } else {
            localStorage.setItem('cart', JSON.stringify(fakeData));
            setCartItems(fakeData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

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
                                            checked={item.isChecked}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            className="w-5 h-5"
                                        />
                                        <Image
                                            src={item.imageUrl}
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
                <CartSumary cartItems={cartItems} />
            </div>
        </div>
    );
}
