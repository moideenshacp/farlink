import axios from "axios"

export const LoginAdmin = async(email:string,password:string)=>{
    try {
        const res =await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/auth/login`,{
        email:email,
        password:password
      },{ withCredentials: true })

      return res
    } catch (error:unknown) {
        console.log(error);
        throw error
    }

}

export const SignUpAdmin = async(name:string,email:string,password:string,confirmPassword:string)=>{
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
          return response
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const VerifyEmailAdmin = async(token: string | null)=>{
    try {
        const res = await axios.post(
            `${
              import.meta.env.VITE_SERVER_BASE_URL
            }/auth-service/api/auth/verify-email?token=${token}`
          );
          return res
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}