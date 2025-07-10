export interface Supplier {
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