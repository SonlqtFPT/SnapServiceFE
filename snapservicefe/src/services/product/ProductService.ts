import { getAPI } from "@/lib/axios";
import { productListRequest, searchProductRequest } from "@/model/request/productRequest";
import { ProductListResponse } from "@/model/response/productRespone";
import { CategoryResponse } from '@/model/response/categoryResponse';

export const fetchProducts = async (request: productListRequest): Promise<ProductListResponse> => {
    const api = getAPI();
      const response = await api.get(`/api/Product`, {
    // const response = await api.get(`http://103.112.211.196:1801/api/Product`, {
        params: {
            page: request.page,
            pageSize: request.pageSize,
        },
    });
    console.log("Response data:", response.data.data); // Kiểm tra dữ liệu trả về
    return response.data.data; // bạn có thể chỉnh lại theo cấu trúc trả về thực tế
};

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
    const api = getAPI();
    try{
        const response = await api.get('/api/Category');
        console.log("Fetched categories:", response.data.data.items);
        return response.data.data;
    }catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
    
}

export const fetchProductsByQuery = async (request: searchProductRequest): Promise<ProductListResponse> => {
    const api = getAPI();
    try{
        const response = await api.get('/api/Product/Search', {
            params:{
                q: request.q,
                page: request.page,
                size: request.size,
                sortOrder: request.sortOrder || 'desc',
                sortBy: request.sortBy || 'createdAt',
                categoryId: request.categoryId || null,
            }
        });
        console.log("Fetched products by query:", response.data);
        return response.data;
    }catch (error) {
        console.error("Failed to fetch products by query:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
    }
}
