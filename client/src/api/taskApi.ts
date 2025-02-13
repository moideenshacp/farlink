import { ITaskDetails } from "../interface/ItaskDetails";
import axiosInstance from "./axiosInterceptor";

//CREATE TASK API=====================================================================================================

export const createTask = async (taskDetails: ITaskDetails) => {
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

//CREATE SUB TASK API=====================================================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSubTask = async (taskDetails: any) => {
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

//FETCH TASK OF A PROJECT API=====================================================================================================

export const fetchTasks = async (projectId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/fetch-tasks`,
      {
        params: { projectId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE TASK API=====================================================================================================

export const updateTask = async (
  taskId: string | undefined,
  taskDetails: ITaskDetails
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/update-task`,
      { taskDetails, taskId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE SUB TASK API=====================================================================================================

export const updateSubTask = async (
  taskId: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskDetails: any
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/update-subTask`,
      { taskDetails, taskId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH EMPLOYEE TASK  API=====================================================================================================

export const fetchEmployeesTask = async (
  projectId: string | undefined,
  employeeId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/fetchEmployees-tasks`,
      {
        params: { projectId, employeeId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH ALL TASK OF EMPLOYEE API=====================================================================================================

export const fetchAllTasksOfEmployee = async (
  employeeId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/fetchEmployees-Alltasks`,
      {
        params: { employeeId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH ALL SUBTASK OF A PARENT TASK API=====================================================================================================

export const fetchAllSubTasksOfTask = async (
  parentTaskId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/task/fetch-subTasks`,
      {
        params: { parentTaskId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
