'use client';

import { useEffect, useState } from 'react';
import { fetchProductDetailBySlug } from '@/services/product/ProductService';
import { ProductType } from '@/types/product/ProductType';
import ProductImageGallery from './ProductImageGallery';
import ProductDetails from './ProductDetails';
import { useParams } from "next/navigation";

export default function ProductDetailClient() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState(false);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchProductDetailBySlug({ slug })
        .then(setProduct)
        .catch(err => {
          console.error('Failed to fetch product:', err);
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [slug]);
  console.log("product",product);

  if (error) return <div className="text-red-500">Product not found or an error occurred.</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <ProductImageGallery images={product.images} productName={product.name} />
      <ProductDetails product={product} imageUrl={product.images} />
    </div>
  );
}
