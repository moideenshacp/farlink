import { useState } from "react";
import { Tabs } from "antd";
import DashboardProfile from "../../../shared/components/DashboardProfile";
import DashboardOrg from "../../../shared/components/DashboardOrg";
import DashboardPassword from "../../../shared/components/DashboardPassword";
// import DashboardEmail from "../../../shared/components/DashboardEmail";
import { ImProfile } from "react-icons/im";
import { GoOrganization } from "react-icons/go";
import { RiLockPasswordLine } from "react-icons/ri";
// import { MdOutlineEmail } from "react-icons/md";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const items = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <ImProfile />
          Profile
        </span>
      ),
      children: <DashboardProfile />,
    },
    {
      key: "organization",
      label: (
        <span className="flex items-center gap-2">
          <GoOrganization />
          Organization
        </span>
      ),
      children: <DashboardOrg />,
    },
    {
      key: "password",
      label: (
        <span className="flex items-center gap-2">
          <RiLockPasswordLine />
          Password
        </span>
      ),
      children: <DashboardPassword />,
    },
    // {
    //   key: "email",
    //   label:   (
    //     <span className="flex items-center gap-2">
    //       <MdOutlineEmail />
    //       Email
    //     </span>
    //   ),
    //   children: <DashboardEmail />,
    // },
  ];

  return (
    <div className="container mx-auto p-6">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </div>
  );
};

export default DashboardSettings;
