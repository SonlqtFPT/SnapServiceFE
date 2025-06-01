import { getAPI } from "@/lib/axios";
import { ProductType } from "../../types/product/ProductType";

export const fetchProducts = async (page = 1, pageSize = 10): Promise<ProductType[]> => {
    const api = getAPI();
      const response = await api.get(`/api/Product`, {
    // const response = await api.get(`http://103.112.211.196:1801/api/Product`, {
        params: { page, pageSize },
    });
    console.log("Response data:", response.data.data.items); // Kiểm tra dữ liệu trả về
    return response.data.data.items; // bạn có thể chỉnh lại theo cấu trúc trả về thực tế
};