/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInterceptor";

export const fetchAllChats = async (userId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/chat/fetch-chat`,
      {
        params: { userId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMessages = async (chatId: number | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/chat/fetch-messages`,
      {
        params: { chatId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createChat = async (chatDetails: any) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/chat/create-chat`,
      chatDetails,
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateChat = async (chatId: string | undefined, updateData: any) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/chat/update-chat`,
      { chatId, updateData },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchNotifications = async (userId: string | undefined) => {
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/chat-meet-service/api/chat/fetch-notification`,
        {
          params: { userId },
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const markAllAsRead = async (userId: string | undefined) => {
    try {
      const res = await axiosInstance.put(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/chat-meet-service/api/chat/mark-as-read`,
        { userId },
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  
  export const clearNotifications = async (userId: string | undefined) => {
    try {
      const res = await axiosInstance.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/chat-meet-service/api/chat/clearNotifications`,
        { data: { userId }, withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };