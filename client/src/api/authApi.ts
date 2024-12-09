import axios from "axios";

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
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth-service/api/company/register-company`, 
      {organization:organization},
      { withCredentials: true } // If you need to send cookies or session information
    );
    return res;
  } catch (error) {
    console.error('Error submitting Step 2 data:', error);
    throw error;
  }
}