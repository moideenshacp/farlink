import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/farlink.png";
import signup from "../../assets/signUp.jpg";
import Footer from "../../shared/components/landingPageComponents/Footer";
import Header from "../../shared/components/landingPageComponents/Header";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { SignUpAdmin } from "../../api/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
    setError(null)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await SignUpAdmin(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setLoading(false);
      console.log(response.data.message);
      if (response.data.message === "User registered successfully") {
        toast.success("Sucessfully Registred!!", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/verifyEmail-msg");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      if (error.response && error.response.data.errors) {
        const fieldErrors: typeof errors = { ...errors };
        error.response.data.errors.forEach((err: string) => {
          if (err.includes("Name")) fieldErrors.name = err;
          else if (err.includes("email")) fieldErrors.email = err;
          else if (err.includes("Password must contain at least one uppercase letter and one special character."))
         fieldErrors.password = err;
          else if (err.includes("Passwords must match"))
          fieldErrors.confirmPassword = err;
        });
        setErrors(fieldErrors);
        console.log("eee error");
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "Something went wrong.");
          console.log("msg", error.response.data.error);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
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
            SIGN UP
          </h2>
          {error && (
            <div className=" text-red-700  rounded mt-6">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4 " onSubmit={handleSubmit}>
            <div>

            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaUser className="text-[#ADB0CD] mr-3" />
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                name="name"
                className="flex-1 outline-none text-sm text-[#969AB8]"
              />
            </div>
            {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>


              <div>


            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaEnvelope className="text-[#ADB0CD] mr-3" />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="flex-1 outline-none text-sm text-[#969AB8]"
              />
            </div>
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              </div>

              <div>

            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaLock className="text-[#ADB0CD] mr-3" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="flex-1 outline-none text-sm text-[#969AB8]"
              />
            </div>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              </div>


              <div>
            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaLock className="text-[#ADB0CD] mr-3" />
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Repeat Password"
                className="flex-1 outline-none text-sm text-[#969AB8]"
              />
            </div>
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}

              </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white ${
                loading ? "bg-gray-400" : "bg-[#4361EE] hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Verify Email"}
            </button>
          </form>
          <ToastContainer />
          <br />
          <Link to="/forget-password">
            <p className="text-[#4361EE] text-center cursor-pointer">
              Forgot password?
            </p>
          </Link>

          <div className="flex flex-col items-center mt-4 space-y-4">
            <div className="flex items-center w-full">
              <div className="h-px bg-gray-300 flex-1"></div>
              <p className="text-gray-500 px-3">OR</p>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center w-full border border-[#E0E2E9] bg-white py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
            >
              <FcGoogle className="text-2xl mr-2" />
              Continue with Google
            </button>
          </div>
          <br />
          <p className="text-[#969AB8] text-center">
            Already have an account?
            <Link to="/sign-in">
              <span className="text-[#4361EE]">Sign in</span>
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

export default SignUp;
