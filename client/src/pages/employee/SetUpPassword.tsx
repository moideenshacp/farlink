import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/EmailLogo.png";
import { resetPasswordSchema } from "../../validations/employeeSetUpPassword";
import { useNavigate } from "react-router-dom";
import { setUpPassword } from "../../api/employeeApi";
import { useLocation } from "react-router-dom";

const SetUpPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    setEmail(emailParam);
  }, [location.search]);
  const handleValidation = () => {
    const data = { password, confirmPassword };
    const { error } = resetPasswordSchema.validate(data, { abortEarly: false });

    if (error) {
      const validationErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0] as string] = detail.message;
      });
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const res = await setUpPassword(password, confirmPassword,email);
        if(res.data.message === "Password set-up successfully"){
            navigate('/employee-login')
        }
      } else {
        toast.error("Something went wrong!!. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-sm">
        <img
          src={logo}
          alt="FarLink Logo"
          className="w-56 ml-12 mx-auto mb-6"
        />
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Create New Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({});
                }}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                🔒
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({});
                }}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                🔒
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#4361EE] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4361EE] transition"
          >
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SetUpPassword;
