'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { CartItem, SupplierGroupedItems } from './typeOfCart';
import { useRouter } from 'next/navigation';
import CartSumary from './components/CartSumary';
// import { Checkbox } from '@radix-ui/react-checkbox';
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CartClient() {
    const router = useRouter();
    const [isInitialized, setIsInitialized] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    // nhóm sản phẩm theo supplier
    const suppliers: SupplierGroupedItems = {};
    cartItems.forEach((item) => {
        if (!item.supplier || !item.supplier.id) return; // <-- skip if invalid
        const key = item.supplier.id;
        if (!suppliers[key]) {
            suppliers[key] = [];
        }
        suppliers[key].push(item);
    });

    // ccheckbox
    const handleCheckboxChange = (itemId: number) => {
        const updatedItems = cartItems.map(item =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
        );
        setCartItems(updatedItems);
    };



    // tăng quan
    const handleIncrease = (itemId: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // giảm quan
    const handleDecrease = (itemId: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    useEffect(() => {
        const existing = localStorage.getItem('cart');
        localStorage.setItem('checkoutMode', 'cart');
        if (existing) {
            const parsed = JSON.parse(existing).map((item: CartItem) => ({
                ...item,
                isChecked: false,
            }));
            setCartItems(parsed);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems, isInitialized]);

    const handleSelectAllChange = () => {
        const newCheckedState = !isAllSelected;
        setIsAllSelected(newCheckedState);
        const updatedItems = cartItems.map(item => ({
            ...item,
            isChecked: newCheckedState
        }));
        setCartItems(updatedItems);
    };

    useEffect(() => {
        const allSelected = cartItems.length > 0 && cartItems.every(item => item.isChecked);
        setIsAllSelected(allSelected);
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
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                    className="w-5 h-5 mr-2"
                />
                <label className="text-md font-medium text-gray-700">Select All</label>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-9">
                    <div className=" bg-[#634C9F] grid grid-cols-12 items-center rounded-t-md p-2">
                        <div className="col-span-5 text-white font-semibold text-md ml-2">Product</div>
                        <div className="col-span-2 text-center text-white font-semibold text-md">Price</div>
                        <div className="col-span-2 text-center text-white font-semibold text-md">Quantity</div>
                        <div className="col-span-2 text-center text-white font-semibold text-md">Amount</div>
                        <div className="col-span-1 text-center text-white font-semibold text-md">Delete</div>
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
                                            src={item.images.find((image) => image.isMain)!.productImageUrl}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="object-cover rounded-md"
                                        />


                                        <h3 className="text-md font-semibold w-full">{item.name}</h3>
                                    </div>

                                    <div className="col-span-2 text-center text-sm">
                                        <span className="text-red-500 font-bold">{item.discountPrice.toLocaleString()}đ</span>
                                        <div className="text-gray-400 line-through text-sm">{item.price.toLocaleString()}đ</div>
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
                                                disabled={item.quantity >= item.stockInQuantity}
                                                aria-label="Increase quantity"
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="col-span-2  text-center font-semibold">
                                        {(item.discountPrice * item.quantity).toLocaleString()}đ
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
