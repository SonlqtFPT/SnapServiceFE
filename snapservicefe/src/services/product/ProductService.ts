import { getAPI } from "@/lib/axios";
import { ProductType } from "../../types/product/ProductType";
import { CategoryType } from "@/types/product/CategoryType";

export const fetchProducts = async (page = 1, pageSize = 10): Promise<ProductType[]> => {
  const api = getAPI();
  const response = await api.get(`/api/Product`, {
    // const response = await api.get(`http://103.112.211.196:1801/api/Product`, {
    params: { page, pageSize },
  });
  console.log("Response data:", response.data.data.items); // Kiểm tra dữ liệu trả về
  return response.data.data.items; // bạn có thể chỉnh lại theo cấu trúc trả về thực tế
};

export const fetchCategories = async (): Promise<CategoryType[]> => {
  const api = getAPI();
  try {
    const response = await api.get(`/api/Category`);
    console.log("Response data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
}