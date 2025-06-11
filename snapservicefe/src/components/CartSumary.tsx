'use client'
import { CartItem } from '@/app/cart/typeOfCart';
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    cartItems: CartItem[]
}

export default function CartSumary(cart: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const selectedItemList = cart.cartItems.filter((item) => item.isChecked);
    const subtotal = selectedItemList.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
    return (
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
                        {subtotal > 0 && pathname === '/cart' && (
                            <button
                                className="w-[80%] bg-[#634C9F] text-white py-2 rounded-4xl text-lg cursor-pointer"
                                onClick={() => router.push('/checkout')}
                            >
                                Proceed to Checkout ⟶
                            </button>
                        )}
                        {pathname === '/checkout' && (
                            <button
                                className="w-[80%] bg-[#634C9F] text-white py-2 rounded-4xl text-lg cursor-pointer"
                                onClick={() => router.push('/checkout/payment')}
                            >
                                Place Order
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
    )
}
