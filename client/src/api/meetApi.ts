import axiosInstance from "./axiosInterceptor";
import { ImeetDetails } from "../interface/ImeetDetails";

export const createMeet = async (meetDetails: ImeetDetails) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/meet/create-meet`,
      { meetDetails },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
