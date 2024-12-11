import axiosInstance from "./axiosInterceptor";

export const fetchCompanyProfile = async(email:string)=>{
    try {
        const res = await axiosInstance.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/get-companyProfile`,
            {
              params: { email },
              withCredentials: true,
            }
          );
          return res
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompanyProfile = async(
    FormData: object,
    email: string | undefined

)=>{
    try {
        const res = await axiosInstance.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/update-companyProfile`,
            {
              FormData,
              email,
            }
          );

          return res
    } catch (error) {
        console.log(error);
        
    }
}