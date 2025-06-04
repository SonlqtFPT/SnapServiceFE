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

