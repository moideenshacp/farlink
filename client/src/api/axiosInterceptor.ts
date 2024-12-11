import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/user/userSlice';

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true, 
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    let token;
    if(localStorage.getItem('accessToken')){
        token = localStorage.getItem('accessToken')
        console.log("local il ind");
        
    }else{
        const state = store.getState();
         token = state.user.token
         console.log("toooooooooooooooooooooooken",token);
         console.log("Redux token:", state.user.token);
    }

    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
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
        

        // Save the new access token and retry the original request
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
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
