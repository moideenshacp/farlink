import axios from "axios";
import axiosInstance from "./axiosInterceptor";
import { JwtPayload } from "jwt-decode";

export const LoginAdmin = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    return res;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const SignUpAdmin = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/register`,
      {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const VerifyEmailAdmin = async (token: string | null) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/auth-service/api/auth/verify-email?token=${token}`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/logout`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/auth-service/api/auth/forget-password`,
      {
        email: email,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (
  password: string,
  confirmPassword: string,
  token: string | null
) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/auth-service/api/auth/reset-password`,
      {
        password: password,
        confirmPassword: confirmPassword,
        token: token,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const regitserCompany = async (organization:unknown)=>{
  try {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/register-company`, 
      {organization:organization},
      { withCredentials: true } 
    );
    return res;
  } catch (error) {
    console.error('Error submitting Step 2 data:', error);
    throw error;
  }

  
}
export const updateProfile = async (
  fName: string,
  lName: string,
  phone: string,
  email:string | undefined,
  image:string
)=>{
  try {
    const res = await axiosInstance.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/update-profile`, 
      {fName:fName,
        lName:lName,
        phone:phone,
        email:email,
        image:image

      },
      { withCredentials: true } 
    )
    return res
  } catch (error) {
    console.log(error);
    throw error
    
  }
}

export const fetchProfile = async (email: string) => {
  try {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/get-profile`,
      {
        params: { email },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleLogin = async (userData: JwtPayload) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/google-login`,
      userData,
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchEmployeesByIds = async (employeeIds: string[] | unknown) => {
  try {
    
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/auth-service/api/auth/fetch-employeesById`,
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
export const getAllEmployees = async (organizationId: string | undefined,page?:number, pageSize?:number) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/auth-service/api/auth/get-employees`,
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