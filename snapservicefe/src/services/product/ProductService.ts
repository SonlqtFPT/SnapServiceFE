import { getAPI } from "@/lib/axios";
import { AddProductRequest, ProductDetailSlugRequest, productListRequest, searchProductRequest, ToggleProductStatusRequest, UpdateProductRequest } from "@/model/request/productRequest";
import { AddProductResponse, ProductDetailResponse, ProductListResponse, SupplierProductListResponse } from "@/model/response/productRespone";
import { CategoryResponse } from '@/model/response/categoryResponse';

const api = getAPI();

export const fetchProducts = async (request: productListRequest): Promise<ProductListResponse> => {
      const response = await api.get(`/api/Product`, {
        params: {
            page: request.page,
            pageSize: request.pageSize,
        },
    });
    console.log("Response data:", response.data.data); // Kiểm tra dữ liệu trả về
    return response.data.data; // bạn có thể chỉnh lại theo cấu trúc trả về thực tế
};

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
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

export const fetchProductDetailBySlug = async(request: ProductDetailSlugRequest): Promise<ProductDetailResponse> =>
{
    try {
    const response = await api.get(`/api/Product/${request.slug}`);
    console.log("Khong ra detail t nhay lau",response.data);
    return response.data.data;
    } catch (error) {
        console.log("Oh no, loi~ ne`:", error)
        throw error; 
    }
}

export const fetchSupplierProducts = async (
  request: productListRequest
): Promise<SupplierProductListResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found in localStorage.")

    const response = await api.get("/api/Supplier/products", {
      params: {
        pageNumber: request.page,
        pageSize: request.pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
    })
    console.log("Supplier products:", response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch supplier products:", error)
    throw error
  }
}

export const addSupplierProduct = async (
  data: AddProductRequest
): Promise<AddProductResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found")

  const response = await api.post("/api/Product/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/plain",
    },
  })

  return response.data.data
}

export const deleteProductById = async (productId: number): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    await api.delete(`/api/Product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
    });
    console.log(`Product ${productId} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete product ${productId}:`, error);
    throw error;
  }
};

export const updateProductById = async (
  productId: number,
  data: UpdateProductRequest
): Promise<void> => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  await api.post(`/api/Product/update/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/plain"
    }
  })
}

export const toggleProductStatus = async (
  productId: number,
  data: ToggleProductStatusRequest
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  await api.patch(`/api/Product/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  console.log(`Toggled product ${productId} to ${data.isActive ? 'active' : 'inactive'}`);
};

