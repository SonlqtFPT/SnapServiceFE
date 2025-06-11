export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock_in_quantity: number;
  rating_average: number;
  discount_price: number;
  discount_percent: number;
  sold_quantity: number;
  available_quantity: number;
  is_active: boolean;
  is_sale: boolean;
  is_favorite: boolean;
  categories_id: number;
  supplier_id: number;
};
