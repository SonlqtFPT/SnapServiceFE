'use client';

import React, { useState } from 'react';
import { ProductImageType, ProductType } from '@/types/product/ProductType';
import { toast, ToastContainer } from 'react-toastify';
import { CartItem } from '@/app/cart/typeOfCart';
import { useRouter } from 'next/navigation';

type Props = {
  product: ProductType;
  imageUrl?: ProductImageType[];
};

export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const localCart = localStorage.getItem('cart');
  const cartItems: CartItem[] = localCart ? JSON.parse(localCart) : [];
  const [_, forceUpdate] = useState(false);
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex((item: ProductType) => item.id === product.id);

    if (existingItemIndex === -1) {
      cartItems.push({ ...product, quantity })
      localStorage.setItem('cart', JSON.stringify(cartItems));
      toast.success('Product added to cart successfully')
      forceUpdate(prev => !prev);
    }
  }

  const handleBuyNow = () => {
    localStorage.removeItem('checkout')
    const newCheckout = [
      { ...product, quantity },
    ];
    localStorage.setItem('checkout', JSON.stringify(newCheckout));
    localStorage.setItem('checkoutMode', 'buyNow');
    router.push('/checkout');
  }

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer position='top-center' autoClose={2000} />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">SKU: {product.sku}</p>
      <p className="text-xl font-semibold text-green-600">
        {product.discountPrice > 0 ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}đ
        {product.discountPrice > 0 && (
          <span className="ml-2 text-sm line-through text-gray-400">{product.price.toLocaleString()}đ</span>
        )}
      </p>
      <p className="text-sm text-yellow-600">⭐ {product.ratingAverage} rating</p>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-sm text-gray-500">Available: {product.availableQuantity}</p>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center border rounded">
          <button onClick={() => handleQuantityChange(-1)} 
          className="px-3 py-1 text-lg font-bold" 
          disabled={quantity === 1}>-</button>
          <span className="px-4">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} 
          className="px-3 py-1 text-lg font-bold" disabled={quantity === product.availableQuantity}>+</button>
        </div>
        {cartItems.some(item => item.id === product.id) ? (
          <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-xl cursor-not-allowed">
            Already in Cart
          </button>
        ) : (

          <button onClick={handleAddCart} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
            Add to Cart
          </button>
        )
        }

        <button onClick={handleBuyNow} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
          Buy Now
        </button>
      </div>
    </div>
  );
}
