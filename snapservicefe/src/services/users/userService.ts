import { getAPI } from "@/lib/axios";
import { AssignAreaRequest, loginRequest, registerRequest, registerSupplierRequest } from "@/model/request/userRequest";
import { AssignAreaResponse, UserListItem, UserDetail } from "@/model/response/userResponse";
import axios from "axios";
import { CreateUserRequest } from "@/model/request/userRequest";
import { User } from '@/types/user/UserType';


const api = getAPI();
const registerUser = async (data: registerRequest) => {
  try {

    const res = await api.post("/api/Auth/register", data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  }
};

const registerSupplier = async (data: registerSupplierRequest) => {
  try {
    const res = await api.post("/api/Supplier/register", data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Supplier registration failed:", error.response?.data || error.message);
      throw error;
    }
  }
}
const loginUser = async (data: loginRequest) => {
  try {
    const res = await api.post("/api/Auth/login", data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }
};

//fetch users
const fetchUsers = async (
  forceRefresh: boolean = true,
  page: number = 1,
  pageSize: number = 200
): Promise<UserListItem[]> => {
  try {
    const res = await api.get("/api/User/GetAllUser", {
      params: { forceRefresh, page, pageSize },
    });
    const result = res.data.data;

    if (Array.isArray(result.items)) {
      return result.items as UserListItem[];
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", result);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetch users failed:", error.response?.data || error.message);
    }
    throw error;
  }
};

const userProfile = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }
    const res = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return res.data.data as User;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetch user profile failed:", error.response?.data || error.message);
    }
    throw new Error("Không thể lấy thông tin người dùng");
  }
}

// Tạo mới user

const createUser = async (data: CreateUserRequest) => {
  try {
    const res = await api.post("/api/User", data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Create user failed:", error.response?.data.errors || error.message);
      throw error;
    }

  }
};


// Lấy user theo ID (cho trang Edit)
const getUserById = async (id: string): Promise<UserDetail> => {
  try {
    const res = await api.get(`/api/User/GetUserById/${id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Get user failed:", error.response?.data || error.message);
    }
    throw new Error("Không thể lấy thông tin người dùng");
  }
};




const toggleUserStatus = async (userId: number) => {
  const api = getAPI();
  const response = await api.put(`/api/User/UpdateUserStatus/${userId}`);
  return response.data;
};

export const assignShipperArea = async (
  payload: AssignAreaRequest
): Promise<AssignAreaResponse> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

    const response = await api.post('/api/Shipper/assign_area', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Failed to assign area:', error)
    throw error
  }
}



export { registerUser, loginUser, fetchUsers, createUser, getUserById, userProfile, registerSupplier, toggleUserStatus };
