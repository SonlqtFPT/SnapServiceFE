// src/types.ts

export type CartItem = {
  id: number;
  name: string;
  createdAt: Date;
  price: number;
  description: string;
  images: {
    id: number;
    productImageUrl: string;
  }[];
  stockInQuantity: number;
  ratingAverage: number;
  sku: string;
  discountPrice: number;
  discountPercent: number;
  soldQuantity: number;
  availableQuantity: number;
  isActive: boolean;
  isSale: boolean;
  slug: string;
  categoriesId: number;
  supplier:{
    id:number;
  }
  quantity: number;
  isChecked: boolean;
}
// Lưu trạng thái checkbox chọn sản phẩm
export type CartSelectionMap = { [itemId: string]: boolean };

// Nhóm sản phẩm theo supplier_id
export type SupplierGroupedItems = { [supplierId: number]: CartItem[] };

