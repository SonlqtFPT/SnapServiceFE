'use client';

import { useEffect, useState } from 'react';
import { fetchProductDetailBySlug } from '@/services/product/ProductService';
import { ProductType } from '@/types/product/ProductType';
import ProductImageGallery from './ProductImageGallery';
import ProductDetails from './ProductDetails';
import { useParams } from "next/navigation";
import NewArrivals from '../../home/components/NewArrivals';
import ProductTabs from './ProductTab';

import { DynamicBreadcrumbs } from '@/components/DynamicBreadcrumbs';
import Loading from '@/components/Loading';

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
  console.log("product", product);

  if (error) return <div className="text-red-500">Product not found or an error occurred.</div>;
  if (!product) return <div className='flex justify-center min-h-screen items-center'><Loading/></div>;

  return (
    <div>
      <DynamicBreadcrumbs />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImageGallery images={product.images} productName={product.name} discountPercent={product.discountPercent} />
        <ProductDetails product={product} imageUrl={product.images} />
      </div>
      <div className="mt-8">
        <ProductTabs
          productId={product.id}
          description={product.description || 'No description available.'}
        />

      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <NewArrivals />
      </div>
    </div>
  );
}
