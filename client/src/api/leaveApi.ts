import { IleaveData } from "../interface/IleaveData";
import axiosInstance from "./axiosInterceptor";


export const applyLeave = async(leaveData:IleaveData)=>{
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/apply-leave`,
       { leaveData}, {withCredentials: true }
    );
    return res;
    
  } catch (error) {
    console.log(error);
    throw error
    
  }
}

export const fetchLeave = async(employeeEmail:string | undefined)=>{
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/fetch-leave`,
       { employeeEmail}, {withCredentials: true }
    );
    return res;
    
  } catch (error) {
    console.log(error);
    throw error
    
  }
}
export const manageLeaveApplication = async(leaveId:string | undefined,status:string | undefined)=>{
  try {
    
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/manage-leave`,
       { leaveId,status}, {withCredentials: true }
    );
    return res;
    
  } catch (error) {
    console.log(error);
    throw error
    
  }

}

export const fetchRemainingLeaves = async(organizationId:string | undefined,employeeEmail:string | undefined)=>{
  try {
    
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/leave/fetch-remainingLeaves`,
       { organizationId,employeeEmail}, {withCredentials: true }
    );
    return res;
    
  } catch (error) {
    console.log(error);
    throw error
    
  }

}