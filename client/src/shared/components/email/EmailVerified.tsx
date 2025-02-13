import { useLocation } from "react-router-dom";
import logo from "../../../assets/EmailLogo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import AlreadyVerifiedEmail from "./AlreadyVerifiedEmail";
import InvalidVerifyEmail from "./InvalidVerifyEmail";
import SuccessfulEmailVerifcation from "./SuccessfulEmailVerifcation";
import { VerifyEmailAdmin } from "../../../api/authApi";
import { jwtDecode } from "jwt-decode";

const EmailVerified = () => {
  const location = useLocation();
  const [err, setErr] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [role, setRole] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const userRole = urlParams.get("role") || undefined;
      setRole(userRole);

      try {
        if (token) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const decoded: any = jwtDecode(token);
          if (decoded && decoded.email) {
            setEmail(decoded.email);
          }
          const res = await VerifyEmailAdmin(token);
          if (res.data.message === "Email successfully verified.") {
            setVerificationStatus("verified");
          } else if (res.data.message === "User already verified.") {
            setVerificationStatus("verified");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data.error === "User is already verified..") {
              // setVerificationStatus("verified");
              setErr(error.response.data.error);
            }
            setErr(error.response.data.error);
          } else {
            setErr(error.message);
          }
        } else {
          console.log("An unexpected error occurred:", error);
        }
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
          <img
            src={logo}
            alt="FarLink Logo"
            className="w-56 ml-12 mx-auto mb-6"
          />
          {verificationStatus === "verified" ? (
            <SuccessfulEmailVerifcation role={role} email={email} />
          ) : err === "User is already verified.." ? (
            <AlreadyVerifiedEmail role={role} />
          ) : err === "Invalid  or expired token" ? (
            <InvalidVerifyEmail role={role} />
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-[#08AD36]">
                The user was not found.
              </h1>
              <p className="mt-4 text-[#000000]">
                The user was not found. Please ensure the link is correct and
                try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
