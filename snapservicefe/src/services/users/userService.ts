import { getAPI } from "@/lib/axios"; 

// const registerUser = async (data: any) => {
//   try {
//     const api = getAPI(); 
//     const res = await api.post("/api/Auth/register", data);
//     return res.data.data;
//   } catch (error: any) {
//     console.error("Registration failed:", error.response?.data || error.message);
//     throw error;
//   }
// };

// const loginUser = async (data: any) => {
//   try {
//     const api = getAPI(); 
//     const res = await api.post("/api/Auth/login", data);
//     return res.data.data;
//   } catch (error: any) {
//     console.error("Login failed:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getAllUsers = async () => {
//   try {
//     const api = getAPI();
//     const response = await api.get("/api/User/GetAllUser");
//     return response.data.data;
//   } catch (error: any) {
//     console.error("Failed to fetch users:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export { registerUser, loginUser };
