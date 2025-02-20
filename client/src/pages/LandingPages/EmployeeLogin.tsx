import { Link } from "react-router-dom";
import logo from "../../assets/farlink.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginAdmin } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import Header from "../../shared/components/landingPageComponents/Header";

const EmployeeLogin = () => {
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

        // Fix for case mismatch in position check
        if (
          user.role === "employee" &&
          user?.position?.trim().toLowerCase() === "hmmmmmmr"
        ) {
          navigate("/admin/", { replace: true });
          dispatch(login({ user, token: user.token }));
        } else {
          navigate("/employee/", { replace: true });
          dispatch(login({ user, token: user.token }));
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || "Something went wrong.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-[#F8FAFF]">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-16" />
            <h1 className="text-2xl font-bold text-[#172C56] -ml-2 ">
              FarL<span className="text-[#4361EE]">i</span>nk
            </h1>
          </div>
          <h2 className="text-lg font-semibold text-[#172C56] mb-6 text-center">
            SIGN IN
          </h2>

          {error && (
            <div className="text-red-700 text-center mb-4">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaEnvelope className="text-[#ADB0CD] mr-3" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="flex-1 bg-white outline-none text-sm text-[#172C56]"
              />
            </div>

            <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
              <FaLock className="text-[#ADB0CD] mr-3" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="flex-1 bg-white outline-none text-sm text-[#172C56]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4361EE] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <Link to="/forget-password">
            <p className="text-[#4361EE] text-center mt-4 cursor-pointer">
              Forgot password?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
