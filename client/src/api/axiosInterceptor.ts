import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/user/userSlice";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:4000/auth-service/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );
        // const newAccessToken = response.data.accessToken;

        // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
