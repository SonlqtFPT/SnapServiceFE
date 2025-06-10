'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImageType } from '@/types/product/ProductType';

type Props = {
  images?: ProductImageType[];
  productName: string;
};

export default function ProductImageGallery({ images = [], productName }: Props) {
  const [selectedImage, setSelectedImage] = useState<ProductImageType | undefined>(
    images.find(img => img.isMain) || images[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Zoomable and Clickable Main Image */}
      <div
        className="group relative cursor-zoom-in overflow-hidden rounded-xl"
        onClick={() => setIsModalOpen(true)}
      >
        {selectedImage && (
          <Image
            src={selectedImage.productImageUrl}
            alt={productName}
            width={500}
            height={500}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
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
            className={`cursor-pointer rounded border-2 transition duration-200 hover:scale-105 ${
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
