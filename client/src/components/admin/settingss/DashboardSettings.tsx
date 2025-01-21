import { useState } from "react";
import DashboardProfile from "../../../shared/components/DashboardProfile";
import DashboardOrg from "./DashboardOrg";
import DashboardPassword from "../../../shared/components/DashboardPassword";
import DashboardEmail from "../../../shared/components/DashboardEmail";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <DashboardProfile />;
      case "organization":
        return <DashboardOrg />;
      case "password":
        return <DashboardPassword />;
      case "email":
        return <DashboardEmail />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex space-x-6 mb-6">
        <div
          onClick={() => setActiveTab("profile")}
          className={`py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "profile"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Profile
        </div>
        <div
          onClick={() => setActiveTab("organization")}
          className={`py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "organization"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Organization
        </div>
        <div
          onClick={() => setActiveTab("password")}
          className={`py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "password"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Password
        </div>
        <div
          onClick={() => setActiveTab("email")}
          className={`py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "email"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Email
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default DashboardSettings;
