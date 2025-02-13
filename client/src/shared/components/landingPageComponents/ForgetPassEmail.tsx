import { useState } from "react";
import logo from "../../../assets/EmailLogo.png";
import { forgetPassword } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";

const ForgetPassEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const email = e.target.value;
    setEmail(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await forgetPassword(email);
      if (response.data.message === "Password reset link sent successfully") {
        navigate("/forget-password-msg");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err: string) => {
          setError(err || "Something went wrong.");
        });
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "Something went wrong.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => [navigate("/sign-in")];
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
          <IoArrowBackCircle
            size={32}
            color="#4361EE"
            className="hover:cursor-pointer"
            onClick={handleBack}
          />
          <img
            src={logo}
            alt="FarLink Logo"
            className="w-56 ml-20 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-[#08AD36]">
            Forgot Password?
          </h1>
          <p className="mt-4 text-[#000000]">
            Please enter your registered email to reset your password.
          </p>

          {error && <div className=" text-red-700  rounded mt-6">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#4361EE]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#4361EE]"
              }`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassEmail;
