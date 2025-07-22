'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImageType } from '@/types/product/ProductType';

type Props = {
  images?: ProductImageType[];
  productName: string;
  discountPercent?: number;
};


export default function ProductImageGallery({ images = [], productName, discountPercent= 0  }: Props) {
  const [selectedImage, setSelectedImage] = useState<ProductImageType | undefined>(
    images.find(img => img.isMain) || images[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('Images:', images);
  console.log('Product Name:', productName);
  console.log('Discount Percent:', discountPercent);

  return (
    <div className="animate-fade-in">
      {/* Zoomable and Clickable Main Image */}
      <div
        className="group relative cursor-zoom-in overflow-hidden rounded-xl"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-tl-xl rounded-br-xl shadow-lg z-20 animate-bounce">
            -{discountPercent}% sale off
          </div>
        )}
        {selectedImage && (
          <Image
            src={selectedImage.productImageUrl}
            alt={productName}
            width={560}
            height={560}
            className=" object-contain rounded-xl transition-transform duration-300 "
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map(image => (
          <Image
            key={image.id}
            src={image.productImageUrl}
            alt="Thumbnail"
            width={80}
            height={80}
            className={`cursor-pointer rounded border-2 transition duration-200  ${
              selectedImage?.id === image.id ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <Image
            src={selectedImage.productImageUrl}
            alt={productName}
            width={800}
            height={800}
            className="object-contain max-h-[90vh] max-w-[90vw] transition-transform duration-300 transform scale-95 hover:scale-100"
          />
        </div>
      )}
    </div>
  );
}
