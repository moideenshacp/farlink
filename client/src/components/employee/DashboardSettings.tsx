import { useState } from "react";
import { Tabs } from "antd";
import DashboardProfile from "../../shared/components/DashboardProfile";
import DashboardOrg from "../../shared/components/DashboardOrg";
import DashboardPassword from "../../shared/components/DashboardPassword";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const items = [
    {
      key: "profile",
      label: "Profile",
      children: <DashboardProfile />,
    },
    {
      key: "organization",
      label: "Organization",
      children: <DashboardOrg />,
    },
    {
      key: "password",
      label: "Password",
      children: <DashboardPassword />,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </div>
  );
};

export default DashboardSettings;
