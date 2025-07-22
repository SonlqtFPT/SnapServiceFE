import { getAPI } from "@/lib/axios";
import { GetOrderDetailRequest, ShipperOrderListRequest, SupplierOrderListRequest, UpdateOrderStatusRequest } from "@/model/request/orderRequest";
import { GetShipperOrderDetailResponse, OrderStatusResponse, ShipperOrderListResponse, SupplierOrderItem, SupplierOrderListResponse, UpdateOrderStatusResponse } from "@/model/response/order";

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

export const fetchShipperOrders = async (
  request: ShipperOrderListRequest
): Promise<ShipperOrderListResponse> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found in localStorage.")

    const response = await api.get("/api/Shipper/orders", {
      params: {
        pageNumber: request.page,
        pageSize: request.pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    const data = response.data.data

    return {
      page: data.page,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPage: data.totalPage,
      items: data.items,
    }
  } catch (error) {
    console.error("Failed to fetch shipper orders:", error)
    throw error
  }
}

export const fetchOrderStatuses = async (): Promise<string[]> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found in localStorage.")
    }

    const response = await api.get<OrderStatusResponse>("/api/Order/status", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })

    return response.data.data
  } catch (error) {
    console.error("Failed to fetch order statuses:", error)
    throw new Error("Could not fetch order statuses.")
  }
}

export const fetchShipperOrderDetail = async (
  orderId: string
): Promise<GetShipperOrderDetailResponse> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found in localStorage.')

    const response = await api.get(`/api/Shipper/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    return response.data as GetShipperOrderDetailResponse
  } catch (error) {
    console.error(`Failed to fetch shipper order with ID ${orderId}:`, error)
    throw error
  }
}
