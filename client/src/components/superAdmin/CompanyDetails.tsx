import { useState } from "react";
import { useLocation } from "react-router-dom";
import CompanyDetailsProfile from "./CompanyDetailsProfile";
import PaymentHistory from "./CompanyDetailsBilling";

const CompanyDetails = () => {
  const location = useLocation();
  const { company } = location.state || {};

  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <CompanyDetailsProfile organization={company} />;
      case "payment-history":
        return <PaymentHistory organization={company} />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 min-h-64 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white  rounded-lg p-16 flex flex-col items-center border border-gray-200">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${"bg-gray-500"}`}
          >
            {company.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-base font-semibold mt-4">{company.name}</h3>
          <div className="flex flex-col items-center mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {company.admin.phone}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                  <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                </svg>
              </span>
              {company.admin.email}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex space-x-6 mb-6 ">
          <div
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === "profile"
                ? "border-b-2 border-[#4361EE] text-[#4361EE]"
                : "text-[#6A7181]"
            }`}
          >
            Profile
          </div>
          <div
            onClick={() => setActiveTab("payment-history")}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === "payment-history"
                ? "border-b-2 border-[#4361EE] text-[#4361EE]"
                : "text-[#6A7181]"
            }`}
          >
            Payment history
          </div>
        </div>

        <div className="ml-6 w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CompanyDetails;
