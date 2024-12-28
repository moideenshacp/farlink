import { useState } from "react";
import DashboardProfile from "../../shared/components/DashboardProfile";
import DashboardPassword from "../../shared/components/DashboardPassword";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <DashboardProfile />;
      case "password":
        return <DashboardPassword />;

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
          onClick={() => setActiveTab("password")}
          className={`py-2 px-4 cursor-pointer ${
            activeTab === "password"
              ? "border-b-2 border-[#4361EE] text-[#4361EE]"
              : "text-[#6A7181]"
          }`}
        >
          Password
        </div>

      </div>
        <div>{renderContent()}</div>
      </div>
  );
};

export default DashboardSettings;
