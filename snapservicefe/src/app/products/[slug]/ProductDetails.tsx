'use client';

import React, { useState } from 'react';
import { ProductType } from '@/types/product/ProductType';

type Props = {
  product: ProductType;
};

export default function ProductDetails({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">SKU: {product.sku}</p>
      <p className="text-xl font-semibold text-green-600">
        ${product.discountPrice > 0 ? product.discountPrice : product.price}
        {product.discountPrice > 0 && (
          <span className="ml-2 text-sm line-through text-gray-400">${product.price}</span>
        )}
      </p>
      <p className="text-sm text-yellow-600">⭐ {product.ratingAverage} rating</p>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-sm text-gray-500">Available: {product.availableQuantity}</p>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center border rounded">
          <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold">-</button>
          <span className="px-4">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg font-bold">+</button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
          Add to Cart
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
          Buy Now
        </button>
      </div>
    </div>
  );
}
