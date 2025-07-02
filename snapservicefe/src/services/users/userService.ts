import { getAPI } from "@/lib/axios";
import { loginRequest, registerRequest } from "@/model/request/userRequest";
import axios from "axios";


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

export const userProfile = async () => {
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

export { registerUser, loginUser };
