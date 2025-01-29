import { ITaskDetails } from "../interface/ItaskDetails";
import axiosInstance from "./axiosInterceptor";

export const createTask= async (taskDetails: ITaskDetails) => {
    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/create-task`,
        { taskDetails },
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };