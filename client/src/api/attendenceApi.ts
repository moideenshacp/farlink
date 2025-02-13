/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInterceptor";

//UPDATE ATTENDENCE POLICY=========================================================================================================

export const updatePolicy = async (
  policyData: any,
  organizationId: string | undefined
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/attendence/update-policy`,
      { policyData, organizationId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE ATTENDENCE API=========================================================================================================

export const updateAttendence = async (
  attendenceId: string | undefined,
  checkIn: string,
  checkOut: string
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/attendence/update-attendence`,
      { attendenceId, checkIn, checkOut },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log();
    throw error;
  }
};

//FETCH POLICY API=========================================================================================================

export const fetchPolicy = async (organizationId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/attendence/get-policy`,
      { params: { organizationId }, withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//MANAGE ATTENDENCE API=========================================================================================================

export const manageAttendence = async (
  organizationId: string | undefined,
  employeeEmail: string | undefined
) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/attendence/handle-attendence`,
      { organizationId, employeeEmail },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH ATTENDENCE REPORT API=========================================================================================================

export const getAttendenceReport = async (
  employeeEmail: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/attendence/get-attendence`,
      { params: { employeeEmail }, withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
