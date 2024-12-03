import { useEffect, useState } from "react";
import logo from "../../../assets/EmailLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  exp: number;
}

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (!token) {
      toast.error("Token is missing", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/invalid-forget-password");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        setIsTokenValid(false);
        toast.error("Token has expired", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/invalid-forget-password");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setIsTokenValid(false);
      toast.error("Invalid token", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/invalid-forget-password");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isTokenValid) {
      toast.error(
        "Token is not valid. Please request a new password reset link.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }
    setIsLoading(true);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    console.log("reset password token", token);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword(password, confirmPassword, token);
      if (response.data.message === "Password updated successfully") {
        toast.success("password changed successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
      console.log(response.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err: string) => {
          toast.error(err, {
            position: "top-right",
            autoClose: 3000,
          });
        });
        console.log("eee error");
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 3000,
          });
          console.log("msg", error.response.data.error);
        }
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
          <img
            src={logo}
            alt="FarLink Logo"
            className="w-56 ml-20 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-[#08AD36]">Reset Password</h1>
          <p className="mt-4 text-[#000000]">
            Enter your new password and confirm it to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#4361EE]"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
