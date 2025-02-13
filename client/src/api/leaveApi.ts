import { IleaveData } from "../interface/IleaveData";
import axiosInstance from "./axiosInterceptor";

//APPLY LEAVE  API=====================================================================================================

export const applyLeave = async (leaveData: IleaveData) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/apply-leave`,
      { leaveData },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH LEAVE BY EMPLOYEE EMAIL API=====================================================================================================

export const fetchLeave = async (employeeEmail: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/fetch-leave`,
      {
        params: {
          employeeEmail,
        },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//MANAGE LEAVE API=====================================================================================================

export const manageLeaveApplication = async (
  leaveId: string | undefined,
  status: string | undefined
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/manage-leave`,
      { leaveId, status },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//EDIT LEAVE API=====================================================================================================

export const editLeave = async (
  leaveId: string | undefined,
  formData: IleaveData
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/edit-leave`,
      { leaveId, formData },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH REMAINING LEAVE OF AN EMPLOYEE  API=====================================================================================================

export const fetchRemainingLeaves = async (
  organizationId: string | undefined,
  employeeEmail: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/fetch-remainingLeaves`,
      {
        params: {
          organizationId,
          employeeEmail,
        },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
