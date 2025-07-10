export interface Order {
  id: number;
  code?: string;
  total?: number;
  createdAt?: string;
  status?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Preparing'
  | 'Delivery'
  | 'Delivered'
  | 'Returned'
  | 'Cancelled'
  | 'Refunding'
  | 'Refunded'

export interface OrderDetail {
  id: number
  productId: number
  productName: string
  productImage: string | null
  quantity: number
  price: number
  discountPercent: number
  note: string
  status: OrderStatus
}


export interface SupplierOrderItem {
  id: string;
  total: number;
  userId: number;
  userFullName: string;
  createdAt: string;
  address: string;
  shippingPrice: number;
  supplierId: number;
  supplierName: string;
  paidAt: string | null;
  deliveriedAt: string | null;
  orders_details: OrderDetail[];
}

export interface SupplierOrderListResponse {
  totalItems: number;
  page: number;
  pageSize: number;
  totalPage: number;
  items: SupplierOrderItem[];
}

export interface UpdateOrderStatusResponse {
  message: string
  statusCode: number
}

export interface GetOrderDetailResponse {
  statusCode: number
  message: string
  data: SupplierOrderItem
}
