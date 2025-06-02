export interface ProductListResponse {
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
};


