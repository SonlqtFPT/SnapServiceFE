import type { CategoryType } from "./CategoryType";
import type { Supplier } from "./SupplierType";

export type ProductImageType = {
  id: number;
  productImageUrl: string;
  isMain: boolean;
};

export type ProductType = {
  id: number;
  name: string;
  createdAt: string;
  price: number;
  description: string;
  stockInQuantity: number;
  ratingAverage: number;
  sku: string;
  discountPrice: number;
  discountPercent: number;
  soldQuantity: number;
  availableQuantity: number;
  isActive: boolean;
  isSale: boolean;
  isFavorite?: boolean;
  slug: string;
  images?: ProductImageType[];
  categories: CategoryType;
  supplier: Supplier;
};

export type ReviewType = {
  id: number;
  productId: number;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
};
