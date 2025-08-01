import { CategoryType } from "@/types/product/CategoryType";
import { ProductImageType } from "@/types/product/ProductType";
import { Supplier } from "@/types/product/SupplierType";

export interface ItemResponse {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  slug: string;
  ratingAverage: number;
  isSale: boolean;
  stockInQuantity: number;
  imageUrl: string;
  categoriesId: number;
  supplierId: number;
  discountPercent: number;
  soldQuantity: number;
  createdAt: string;
  isActive: boolean;
};

export interface ProductListResponse {
  totalItems: number;
  totalPage: number;
  page: number;
  pageSize: number;
  items: ItemResponse[];
}

export interface ProductDetailResponse {
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
}

export interface AddProductResponse {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    discountPrice: number;
    discountPercent: number;
    ratingAverage: number;
    isSale: boolean;
    stockInQuantity: number;
    soldQuantity: number;
    categoriesId: number;
    supplierId: number;
    createdAt: string;
    isActive: boolean;
}

export interface SupplierProductListResponse {
  totalItems: number;
  totalPage: number;
  page: number;
  pageSize: number;
  items: SupplierItemResponse[];
}

export interface SupplierItemResponse {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  ratingAverage: number;
  isSale: boolean;
  stockInQuantity: number;
  soldQuantity: number;
  categoryName: string; 
  supplierId: number;
  createdAt: string;
  isActive: boolean;
}
