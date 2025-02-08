/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInterceptor";

export const fetchAllPrivateChats = async (userId:string | undefined) => {
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/chat-meet-service/api/chat/fetch-chat`,
        {
          params: {userId},
  
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const createChat = async (chatDetails:any) => {
    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/chat-meet-service/api/chat/create-chat`,
         chatDetails ,
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };