export interface SupplierOrderListRequest {
  page: number;
  pageSize: number;
}

export interface UpdateOrderStatusRequest {
  orderId: string
  productId: number
  status:
    | 'Pending'
    | 'Preparing'
    | 'Delivery'
    | 'Delivered'
    | 'Returned'
    | 'Cancelled'
    | 'Refunding'
    | 'Refunded'
}
