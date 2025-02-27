import axiosInstance from "./axiosInterceptor";
import { ImeetDetails } from "../interface/ImeetDetails";

//CREATE NEW MEET API=====================================================================================================

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

//FETCH MEETS OF AN ORGANIZATION API=====================================================================================================

export const fetchMeets = async (organizationId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/meet/fetch-meets`,
      { params: { organizationId }, withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//EDIT MEET API=====================================================================================================

export const editMeet = async (meetId: string, meetDetails: ImeetDetails) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/meet/edit-meet`,
      { meetId, meetDetails },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE MEET API=====================================================================================================

export const deleteMeet = async (meetId: string) => {
  try {
    const res = await axiosInstance.delete(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/meet/delete-meet`,
      { params: { meetId }, withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH ALL MEETS OF AN EMPLOYEE API=====================================================================================================

export const fetchAllMeetsOfEmployee = async (
  employeeId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/chat-meet-service/api/meet/fetchEmployees-Allmeets`,
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
