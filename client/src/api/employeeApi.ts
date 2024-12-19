import axios from "axios";
import axiosInstance from "./axiosInterceptor";

interface EmployeeData {
  userName: string;
  position: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
}

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
  }
};

export const uploadImageToCloudinary = async (
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
      "EMPLOYEE_PHOTO"
  );
  try {
    console.log("CLOUDINARY_NAME:", import.meta.env.VITE_CLOUDINARY_NAME);
    console.log(
      "UPLOAD_PRESET:",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME || "jMaf1ySQB98TlqeDVQDD_6RbQCE"
      }/image/upload`,
      formData
    );
    setIsUploading?.(false);
    console.log("res.data.secure_url", res.data.secure_url);

    return res.data.secure_url;
  } catch (error) {
    console.log("error uploading image:", error);
    setIsUploading?.(false);
    return null;
  }
};

export const getAllEmployees = async (organizationId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/employee-service/api/employee/get-employees`,
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
