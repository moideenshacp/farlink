/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInterceptor";

//FETCH ALL-CHATS OF A USER API=========================================================================================================

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

//FETCH ALL-MESSAGES OF A USER BY CHAT-ID=========================================================================================================

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

//CREATE NEW CHAT API=========================================================================================================

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

//UPDATE CHAT API=========================================================================================================

export const updateChat = async (
  chatId: string | undefined,
  updateData: any
) => {
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

//FETCH ALL-NOTIFICATION OF A USER API=========================================================================================================

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

//MARK ALL-NOTIFICATION READ API=========================================================================================================

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

//CLEAR ALL-NOTIIFICATION OF A USER API=========================================================================================================

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
