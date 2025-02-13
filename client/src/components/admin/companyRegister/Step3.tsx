import logo from "../../../assets/EmailLogo.png";
import Footer from "../../../shared/components/landingPageComponents/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleOrganizationStatus } from "../../../redux/user/userSlice";
import { useEffect } from "react";

const Step3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectHome = () => {
    navigate("/admin/", { replace: true });
  };
  useEffect(() => {
    dispatch(toggleOrganizationStatus());
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="FarLink Logo"
            className="mx-auto w-60 ml-8 mb-1"
          />
        </div>
        <div className="text-sm text-gray-500 text-center mb-4">
          <span className="bg-[#D9D9D9] text-[#FFFFFF] font-inter font-extrabold px-3 py-2 rounded-full">
            step 3/3
          </span>{" "}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Congratulations!!!</h2>
          <p className="text-[#6C757D]">
            You have successfully configured your company in FarLink.
          </p>
        </div>

        <div className="space-y-4 w-full max-w-lg">
          <div className="border border-[#20AC8C] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4361EE] mb-2">
              NEXT STEP FOR YOU
            </h3>
            <ul className="list-disc list-inside text-[#6C757D]">
              <li>Invite your teammates to FarLink</li>
              <li>Configure track settings & timezone as per your need</li>
            </ul>
          </div>

          <div className="border border-[#20AC8C] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4361EE] mb-2">
              NEXT STEP FOR EMPLOYEES
            </h3>
            <ul className="list-disc list-inside text-[#6C757D]">
              <li>Create an account using the invite mail or invite link</li>
              <li>Set password</li>
              <li>Start using it</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={redirectHome}
            className="bg-[#4361EE] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#4361EE]transition"
          >
            Go To Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step3;
