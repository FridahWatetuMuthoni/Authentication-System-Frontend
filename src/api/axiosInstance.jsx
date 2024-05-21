import axios from "axios";

const BASE_URL =
  "https://social-authentication-system-backend.onrender.com/users/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
