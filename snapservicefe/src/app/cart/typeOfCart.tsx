// src/types.ts

export type CartItem = {
  id: string;
  name: string;
  created_at: Date;
  price: number;
  description: string;
  image: string;
  stock_in_quantity: number;
  rating_average: number;
  sku: string;
  discountPrice: number;
  discount_percent: number;
  sold_quantity: number;
  available_quantity: number;
  is_active: boolean;
  is_sale: boolean;
  is_favorite: boolean;
  slug: string;
  categories_id: number;
  supplier_id: number;
  quantity: number;
}
// Lưu trạng thái checkbox chọn sản phẩm
export type CartSelectionMap = { [itemId: string]: boolean };

// Nhóm sản phẩm theo supplier_id
export type SupplierGroupedItems = { [supplierId: number]: CartItem[] };

