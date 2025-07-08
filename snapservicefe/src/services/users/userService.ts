import { getAPI } from "@/lib/axios";
import { loginRequest, registerRequest, UserRequest } from "@/model/request/userRequest";
import { UserListItem } from "@/model/response/userResponse";
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
const fetchUsers = async (): Promise<UserListItem[]> => {
  try {
    const res = await api.get("/api/User/GetAllUser");
    return res.data.data as UserListItem[];
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
const getUserById = async (id: string): Promise<UserListItem> => {
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




// Cập nhật user
const updateUser = async (id: string, data: UserRequest) => {
  try {
    const res = await api.put(`/api/User/UpdateUser/${id}`, data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Update user failed:", error.response?.data || error.message);
      throw error;
    }
  }
};

// Xoá user
const deleteUser = async (id: string) => {
  try {
    const res = await api.delete(`/api/User/DeleteUser/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Delete user failed:", error.response?.data || error.message);
      throw error;
    }
  }
};

const userProfile = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fetching user profile failed:", error.response?.data || error.message);
        throw error;
      }
    }
  }
}



export { registerUser, loginUser, fetchUsers, createUser, updateUser, deleteUser, getUserById, userProfile};

