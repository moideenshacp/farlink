import { useState } from "react";
import { Tabs } from "antd";
import DashboardProfile from "../../shared/components/DashboardProfile";
import DashboardPassword from "../../shared/components/DashboardPassword";
import DashboardEmail from "../../shared/components/DashboardEmail";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const items = [
    {
      key: "profile",
      label: "Profile",
      children: <DashboardProfile />,
    },
    {
      key: "password",
      label: "Password",
      children: <DashboardPassword />,
    },
    {
      key: "email",
      label: "Email",
      children: <DashboardEmail />,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </div>
  );
};

export default DashboardSettings;
