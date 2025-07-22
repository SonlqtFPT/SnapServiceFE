export interface OrderDetailReport {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  discountPercent: number;
  note: string;
  status: string;
}

export interface OrderReportItem {
  id: string;
  total: number;
  userId: number;
  userFullName: string;
  createdAt: string;
  address: string;
  status: string;
  shippingPrice: number;
  supplierId: number;
  supplierName: string;
  paidAt: string;
  deliveriedAt: string;
  orders_details: OrderDetailReport[];
}

export interface OrdersReport {
  totalItems: number;
  page: number;
  pageSize: number;
  totalPage: number;
  items: OrderReportItem[];
}

export interface ReportOrdersByMonthResponse {
  year: number;
  month: number;
  day: number;
  totalOrders: number;
  orders: OrdersReport;
}
