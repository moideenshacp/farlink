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
    email: string | undefined,

)=>{
    try {
        const res = await axiosInstance.patch(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/update-companyProfile`,
            {
              FormData,
              email,
            },{withCredentials:true}
          );

          return res
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchAllCompanies = async()=>{
    try {
        const res = await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/fetch-allOrganization`,{
            withCredentials:true
        })
        return res
        
    } catch (error) {
        console.log(error);
        
    }
}

export const blockOrganization = async(email:string)=>{
    try {
        const res = await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/block-organization`,{
            params:{email},
            withCredentials:true
        })
        return res
    } catch (error) {
        console.log(error);
        
    }
}