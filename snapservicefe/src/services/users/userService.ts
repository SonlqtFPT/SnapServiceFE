import { getAPI } from "@/lib/axios";
import { loginRequest, registerRequest} from "@/model/request/userRequest";
import { UserListItem, UserDetail } from "@/model/response/userResponse";
import axios from "axios";
import { CreateUserRequest } from "@/model/request/userRequest";


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



export { registerUser, loginUser, fetchUsers, createUser, toggleUserStatus, getUserById};
