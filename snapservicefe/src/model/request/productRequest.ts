export interface productListRequest {
    page: number;
    pageSize: number;
}

export interface searchProductRequest {
    q: string;
    categoryId?: number | null;
    page: number;
    size: number;
    sortBy: string;
    sortOrder: string;
}

export interface ProductDetailSlugRequest {
    slug: string;
}

export interface AddProductRequest {
  name: string;
  price: number;
  description: string;
  stockInQuantity: number;
  discountPercent: number;
  isSale: boolean;
  sku: string;
  categoriesId: number;
}

export interface UpdateProductRequest {
  name: string;
  price: number;
  description: string;
  stockInQuantity: number;
  discountPercent: number;
  isSale: boolean;
  sku: string;
  categoriesId: number;
}
