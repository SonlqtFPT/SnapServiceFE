import { getAPI } from "@/lib/axios";
import { GetOrderDetailRequest, SupplierOrderListRequest, UpdateOrderStatusRequest } from "@/model/request/orderRequest";
import { SupplierOrderItem, SupplierOrderListResponse, UpdateOrderStatusResponse } from "@/model/response/order";

const api = getAPI();

export const fetchSupplierOrders = async (
  request: SupplierOrderListRequest
): Promise<SupplierOrderListResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found in localStorage.");

    const response = await api.get("/api/Supplier/orders", {
      params: {
        pageNumber: request.page,
        pageSize: request.pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain", 
      },
    });

    console.log("Fetched supplier orders:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch supplier orders:", error);
    throw error;
  }
};

export const updateOrderItemStatus = async (
  payload: UpdateOrderStatusRequest
): Promise<UpdateOrderStatusResponse> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

    const response = await api.put('/api/Order/update-status', null, {
      params: {
        orderId: payload.orderId,
        productId: payload.productId,
        status: payload.status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/plain',
      },
    })

    return response.data
  } catch (err) {
    console.error('Failed to update order status:', err)
    throw err
  }
}

export const fetchSupplierOrderDetail = async (
  request: GetOrderDetailRequest
): Promise<SupplierOrderItem> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found in localStorage.")

    const response = await api.get(`/api/Supplier/order/${request.orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/plain',
      }
    })

    return response.data.data
  } catch (error) {
    console.error("Failed to fetch order detail:", error)
    throw error
  }
}