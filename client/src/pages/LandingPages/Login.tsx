import { Link } from "react-router-dom";
import logo from "../../assets/farlink.png";
import signup from "../../assets/signUp.jpg";
import Footer from "../../shared/components/landingPageComponents/Footer";
import Header from "../../shared/components/landingPageComponents/Header";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogin, LoginAdmin } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login, setOrganizationId } from "../../redux/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import Input from "../../shared/components/Input";
import { message } from "antd";
import { Input } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await LoginAdmin(formData.email, formData.password);

      if (res.data.message === "Login sucessfull") {
        const user = res.data.user;

        if (user.role === "admin") {
          dispatch(login({ user, token: user.token }));

          if (user.isOrganizationAdded) {
            dispatch(setOrganizationId(user.organizationId));

            navigate("/admin/", { replace: true });
          } else {
            navigate("/step-1", { replace: true });
          }
        }

        // Check for superAdmin role
        if (user.role === "superAdmin") {
          dispatch(login({ user, token: user.token }));
          navigate("/superAdmin/", { replace: true });
        }

        if (user.role === "employee") {
          message.error("Please do Login via employee login section!!.", 2);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "Something went wrong.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      try {
        const userData = jwtDecode(credentialResponse.credential);
        const res = await googleLogin(userData);
        if (res.data.message === "Login sucessfull") {
          const user = res.data.user;

          if (user.role === "admin") {
            dispatch(login({ user, token: user.token }));

            if (user.isOrganizationAdded) {
              dispatch(setOrganizationId(user.organizationId));
              navigate("/admin/", { replace: true });
            } else {
              navigate("/step-1", { replace: true });
            }
          }

          // Check for superAdmin role
          if (user.role === "superAdmin") {
            dispatch(login({ user, token: user.token }));
            navigate("/superAdmin/", { replace: true });
          }
          if (user.role === "employee") {
            message.error("Please do Login via employee login section!!.", 2);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.error || "Something went wrong.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
        console.error("Error decoding Google token:", error);
        message.error("Google Login Failed. Please try again.", 2);
      }
    }
  };

  const handleGoogleLoginFailure = () => {
    message.error("Google Login Failed. Please try again.", 2);
  };

  return (
    <div>
      <div className="flex bg-white flex-col lg:flex-row">
        <Header />

        <div className="flex flex-col justify-center h-auto lg:h-[480px] w-full lg:w-[50%] bg-[#F8FAFF] p-6 lg:p-12">
          <div className="flex items-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 lg:w-36 lg:h-36 sm: mt-20 lg:mt-96 lg:-ml-12 sm: -ml-5"
            />
            <h1 className="lg:mt-96 sm: mt-20 text-xl lg:text-4xl font-bold text-[#172C56] lg:-ml-8">
              FarL<span className="text-[#4361EE]">i</span>nk
            </h1>
          </div>
          <h2 className="text-lg lg:text-3xl font-semibold text-[#172C56] mt-2 lg:mt-0">
            SIGN IN
          </h2>

          {error && <div className=" text-red-700  rounded mt-6">{error}</div>}

          <form className="mt-6 space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Email Input */}

            <Input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your Email"
              className="flex-1 w-full pl-5 outline-none p-2 px-2 text-sm text-[#969AB8]"
              prefix={<FaEnvelope className="text-[#ADB0CD] mr-3" />}
            />

            {/* Password Input */}

            <Input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your Password"
              className="flex-1 w-full pl-5 outline-none p-2 px-2 text-sm text-[#969AB8]"
              prefix={<FaLock className="text-[#ADB0CD] mr-3" />}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4361EE] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <br />
          <Link to="/forget-password">
            <p className="text-[#4361EE] cursor-pointer text-center">
              Forgot password?
            </p>
          </Link>

          <div className="flex flex-col items-center mt-4 space-y-4">
            <div className="flex items-center w-full">
              <div className="h-px bg-gray-300 flex-1"></div>
              <p className="text-gray-500 px-3">OR</p>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
            />
          </div>
          <br />
          <p className="text-[#969AB8] text-center">
            Don’t have an account?
            <Link to="/sign-up">
              <span className="text-[#4361EE]">Sign up</span>
            </Link>
          </p>
        </div>

        <div className="h-auto w-full lg:w-[50%] lg:flex items-center justify-center bg-[#F8FAFF] lg:-mt-10 ">
          <img src={signup} alt="Signup" className="max-w-full h-auto" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
