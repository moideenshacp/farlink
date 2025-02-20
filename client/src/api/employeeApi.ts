import axios from "axios";
import axiosInstance from "./axiosInterceptor";

interface EmployeeData {
  userName: string;
  position: string | null;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
}

interface EmployeeDetails {
  employeeId: string;
  userName: string;
  position: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  dateOfJoining: string;
  dateOfBirth: string;
  highestQualification: string;
  institution: string;
  qualificationYear: string;
  fatherName: string;
  fatherProfession: string;
  motherName: string;
  motherProfession: string;
}

//ADD EMPLOYEE API=========================================================================================================

export const addEmployee = async (employeeData: EmployeeData) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/register-employee`,
      {
        employeeData,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPLOAD FILE TO CLOUDINARY API=========================================================================================================

export const uploadFileToCloudinary = async (
  selectedFile: File,
  setIsUploading?: (state: boolean) => void
) => {
  if (!selectedFile) return null;
  setIsUploading?.(true);

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append(
    "upload_preset",
    (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string) ||
      "YOUR_DEFAULT_PRESET"
  );

  const fileType = selectedFile.type.split("/")[0];
  const resourceType =
    fileType === "image" ? "image" : fileType === "video" ? "video" : "raw";

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/${resourceType}/upload`,
      formData
    );
    setIsUploading?.(false);
    return res.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    setIsUploading?.(false);
    return null;
  }
};

//GET ALL-EMPLOYEES OF A COMPANY API=========================================================================================================

export const getAllEmployees = async (organizationId: string | undefined,page?:number, pageSize?:number) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/get-employees`,
      {
        params: { organizationId ,page,pageSize},
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//UPDATE EMPLOYEE-DETAILS API=========================================================================================================

export const updateEmployeeDetails = async (data: EmployeeDetails) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/update-employee`,
      {
        data,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//SEND INVITATION TO EMPLOYEE API=========================================================================================================

export const sendInvitationEmployee = async (email: string | null) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/invite-employee`,
      { email },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//SET-UP EMPLOYEE PASSWORD API=========================================================================================================

export const setUpPassword = async (
  password: string | null,
  confirmPassword: string | null,
  email: string | null
) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/set-up-password`,
      { password, confirmPassword, email }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH EMPLOYEESCOUNT OF AN ORGANIZATION API=========================================================================================================

export const fetchEmployeesCount = async (
  organizationId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/fetch-EmployeesCount`,
      {
        params: { organizationId },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//TERMINATE EMPLOYEE API=========================================================================================================

export const terminateEmployee = async (email: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/terminate-employee`,
      {
        params: { email },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//ADD POSITION-ORGANIZATION API=========================================================================================================

export const addPosition = async (
  organizationId: string | undefined,
  position: string
) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/add-position`,
      { organizationId, position }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH ORGANIZATION POSITION API=====================================================================================================

export const fetchPositions = async (organizationId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/fetch-position`,
      {
        params: {
          organizationId,
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


//FETCH EMPLOYEES BY THEIR ID  API=====================================================================================================

export const fetchEmployeesByIds = async (employeeIds: string[] | unknown) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/fetch-employeesById`,
      {
        params: {
          employeeIds,
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
