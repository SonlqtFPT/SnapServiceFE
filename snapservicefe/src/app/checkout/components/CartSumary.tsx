'use client'
import { CartItem } from '@/app/cart/typeOfCart';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { paypalPayment } from '@/services/payment/paymentService';

type Props = {
    cartItems?: CartItem[]
}

export default function CartSumary({ cartItems = [] }: Props) {
    const router = useRouter();
    const [cartData, setCartData] = useState<CartItem[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const getCookie = (name: string): string | null => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? decodeURIComponent(match[2]) : null;
        };
        setToken(getCookie('token') || null);

        const mode = localStorage.getItem('checkoutMode');
        if (mode === 'buyNow') {
            const local = localStorage.getItem('checkout');
            const parsed: CartItem[] = local ? JSON.parse(local) : [];
            setCartData(parsed);
        } else {
            const local = localStorage.getItem('cart');
            const parsed: CartItem[] = local ? JSON.parse(local) : [];
            const selected = parsed.filter(item => item.isChecked);
            setCartData(selected);
        }
    }, [cartItems]);

    const subtotal = cartData.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (token === null) {
            toast.error('Please login before proceeding to checkout');
        }
        else {
            console.log(subtotal.toString());
            try {
                const res = await paypalPayment(subtotal.toString());
                if (res.statusCode === 200) {
                    toast.success('Redirecting to payment gateway...');
                    localStorage.removeItem('checkout');
                    setTimeout(() => {
                        router.push(res.data.url);
                    }, 2000);
                }
            } catch (err) {
                console.error('Error during checkout:', err);
                toast.error('Checkout failed. Please try again later.');
            }
        }
    }

    return (
        <div className="col-span-3">
            <ToastContainer position='top-center' autoClose={2000} />
            <div className="sticky top-6 z-10">
                <div className="text-xl text-center  font-bold rounded-t-md p-2 text-gray-600 bg-gray-200">Summary</div>

                <div className='rounded-b-md shadow px-4 py-2' >
                    <div className="flex justify-between items-center mb-2">
                        <span>Subtotal</span>
                        <span>{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <hr className="border-dashed border-t-2 border-gray-300 my-4" />
                    <div className="flex justify-between items-center font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>{subtotal.toLocaleString()}đ</span>
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                        <button
                            className="w-[80%] bg-[#634C9F] text-white py-2 rounded-4xl text-lg cursor-pointer"
                            onClick={() => handleCheckout()}
                        >
                            Place Order
                        </button>
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

