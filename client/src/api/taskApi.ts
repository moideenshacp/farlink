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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const createSubTask= async (taskDetails: any) => {
    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/create-subTask`,
        { taskDetails },
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const fetchTasks = async (projectId: string | undefined) => {
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/fetch-tasks`,
        {
          params: {projectId},
  
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const updateTask = async (taskId:string | undefined ,taskDetails: ITaskDetails) => {
    try {
      const res = await axiosInstance.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/update-task`,
        { taskDetails ,taskId},
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const fetchEmployeesTask = async (projectId: string | undefined,employeeId:string | undefined) => {
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/fetchEmployees-tasks`,
        {
          params: {projectId,employeeId},
  
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const fetchAllTasksOfEmployee = async (employeeId:string | undefined) => {
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/project-service/api/task/fetchEmployees-Alltasks`,
        {
          params: {employeeId},
  
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };