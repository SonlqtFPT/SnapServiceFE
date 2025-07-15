'use client';

import React, { useState } from 'react';
import { ProductImageType, ProductType } from '@/types/product/ProductType';
import { toast, ToastContainer } from 'react-toastify';
import { CartItem } from '@/app/cart/typeOfCart';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

type Props = {
  product: ProductType;
  imageUrl?: ProductImageType[];
};

export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const localCart = localStorage.getItem('cart');
  const cartItems: CartItem[] = localCart ? JSON.parse(localCart) : [];
  const [, forceUpdate] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex((item: ProductType) => item.id === product.id);

    if (existingItemIndex === -1) {
      cartItems.push({ ...product, quantity });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      toast.success('Product added to cart successfully');
      forceUpdate(prev => !prev);
    }
  };

  const handleBuyNow = () => {
    localStorage.removeItem('checkout');
    const newCheckout = [{ ...product, quantity }];
    localStorage.setItem('checkout', JSON.stringify(newCheckout));
    localStorage.setItem('checkoutMode', 'buyNow');
    router.push('/checkout');
  }
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
      />
    ))
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <ToastContainer position='top-center' autoClose={2000} />
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          <p className="text-yellow-600 flex"> {renderStars(product.ratingAverage)} </p>
          <p className="text-gray-500">({product.soldQuantity} sold)</p>
        </div>

        <hr className="my-2 border-t border-gray-300" />

        <div className='flex texxt-gray-500 italic'>
          <p>Sold by</p>
          <span className="ml-2 font-medium">{product.supplier.name}</span>
        </div>
        <p className="text-2xl font-bold text-red-600">
          {product.discountPrice > 0 ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}đ
          {product.discountPrice > 0 && (
            <span className="ml-2 text-sm line-through text-gray-800">{product.price.toLocaleString()}đ</span>
          )}
        </p>
        <div className="grid grid-cols-2 gap-4 text-center p-5 border rounded-md text-sm">
          <div>
            <span className="text-muted-foreground">Available:</span>
            <span className="ml-2 font-medium">{product.availableQuantity} units</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Stock:</span>
            <span className="ml-2 font-medium">{product.stockInQuantity} units</span>
          </div>
        </div>
        <div className="flex items-center gap-4 m-4">
          <div className="flex items-center border rounded">
            <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold">-</button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg font-bold">+</button>
          </div>
          {cartItems.some(item => item.id === product.id) ? (
            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-xl cursor-not-allowed">
              Already in Cart
            </button>
          ) : (

            <button onClick={handleAddCart} className="bg-green-600 flex-1 justify-center hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
              {/* Cart icon from header */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-shopping-cart w-5 h-5" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
              Add to Cart
            </button>
          )
          }

          <button onClick={handleBuyNow} className="bg-gray-800 hover:bg-gray-700 flex-1 justify-center text-white px-4 py-2 rounded flex items-center gap-2">
            {/* Buy Now icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Buy Now
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b p-5 gap-4">
          <div className="flex items-center text-center gap-2 text-sm">

            <span className="font-semibold">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">2 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">30-Day Returns</span>
          </div>
        </div>
        {/* Supplier Information */}
      </div>
    </div>
  );
}
