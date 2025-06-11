import { getAPI } from "@/lib/axios";
import { loginRequest, registerRequest } from "@/model/request/userRequest";
import axios from "axios";

const registerUser = async (data: registerRequest) => {
  try {
    const api = getAPI();
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
    const api = getAPI();
    const res = await api.post("/api/Auth/login", data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }
};

export const getAllUsers = async () => {
  try {
    const api = getAPI();
    const response = await api.get("/api/User/GetAllUser");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch users:", error.response?.data || error.message);
      throw error;
    }
  }
};

export { registerUser, loginUser };
