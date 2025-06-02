import { getAPI } from "@/lib/axios";
import { productListRequest } from "@/model/request/productRequest";
import { ProductListResponse } from "@/model/response/productRespone";

export const fetchProducts = async (request: productListRequest): Promise<ProductListResponse[]> => {
    const api = getAPI();
      const response = await api.get(`/api/Product`, {
    // const response = await api.get(`http://103.112.211.196:1801/api/Product`, {
        params: {
            page: request.page,
            pageSize: request.pageSize,
        },
    });
    console.log("Response data:", response.data.data.items); // Kiểm tra dữ liệu trả về
    return response.data.data.items; // bạn có thể chỉnh lại theo cấu trúc trả về thực tế
};
