import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/user/userSlice';

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true, 
});



// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log("oroiginal request",originalRequest);
    
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
        console.log("first time anutooo refresh");
        
      try {
        console.log("puthiyaaa access token is genrating===================");
        
        const response = await axios.post('http://localhost:4000/auth-service/api/auth/refresh-token', {}, { 
            withCredentials: true 
        });
        const newAccessToken = response.data.accessToken;
        console.log("neww acess token kittiitoo-------------",newAccessToken);
        

        // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return axiosInstance(originalRequest);  // Retry the original request with the new token
      } catch (refreshError) {
        console.log("refreshhh failed anutto==========================");
        store.dispatch(logout())
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
