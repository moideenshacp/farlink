import { useLocation } from "react-router-dom";
import logo from "../../assets/EmailLogo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import AlreadyVerifiedEmail from "../../components/admin/AlreadyVerifiedEmail";
import InvalidVerifyEmail from "../../components/admin/InvalidVerifyEmail";
import SuccessfulEmailVerifcation from "../../components/admin/SuccessfulEmailVerifcation";
import {  VerifyEmailAdmin } from "../../api/authApi";

const EmailVerified = () => {
  const location = useLocation();
  const [err, setErr] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");

      try {
        const res = await VerifyEmailAdmin(token)

        console.log("dtata=====", res.data.message);
        if (res.data.message === "Email successfully verified.") {
          setVerificationStatus("verified");
        }else if(res.data.message === "User already verified."){
          setVerificationStatus("verified")
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if(error.response.data.error==="User is already verified.."){
              setVerificationStatus("verified")
              console.log('bahabab');
              
            }
            console.log("Error message===:", error.response.data.error);
            setErr(error.response.data.error);
          } else {
            console.log("Error message----:", error.message);
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
            <SuccessfulEmailVerifcation />
          ) : err === "User is already verified.." ? (
            <AlreadyVerifiedEmail />
          ) : err === "Invalid  or expired token" ? (
            <InvalidVerifyEmail />
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
