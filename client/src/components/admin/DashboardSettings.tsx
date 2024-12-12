import { useState } from "react";
import DashboardProfile from "../../shares/components/admin/DashboardProfile";
import DashboardOrg from "./DashboardOrg";
import DashboardPassword from "../../shares/components/admin/DashboardPassword";
import DashboardEmail from "../../shares/components/admin/DashboardEmail";

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
          onClick={() => setActiveTab("organization")}
          className={`py-2 px-4 cursor-pointer ${
            activeTab === "organization"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Organization
        </div>
        <div
          onClick={() => setActiveTab("password")}
          className={`py-2 px-4 cursor-pointer ${
            activeTab === "password"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Password
        </div>
        <div
          onClick={() => setActiveTab("email")}
          className={`py-2 px-4 cursor-pointer ${
            activeTab === "email"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Email
        </div>
      </div>

      <div className="flex mb-6">
        {activeTab === "profile" && (
          <div className="flex-shrink-0">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="User"
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}
        <div className="ml-6 w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardSettings;