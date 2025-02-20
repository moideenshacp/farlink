import { Tabs } from "antd";
import EmployeeProfile_Profile from "./EmployeeProfile_Profile";
import EmployeeProfile_attendence from "./EmployeeProfile_attendence";
import EmployeeProfile_settings from "./EmployeeProfile_settings";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
// import { GrTasks } from "react-icons/gr";
// import { BookCheck } from "lucide-react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { ArrowBigLeftDash } from "lucide-react";

const EmployeeProfile = () => {
  const location = useLocation();
  const { employee } = location.state || {};
  const navigate = useNavigate();
  const userPosition = useSelector(
    (state: RootState) => state.user?.user?.position
  );

  const items = [
    {
      key: "profile",
      label: "Profile",
      children: <EmployeeProfile_Profile employee={employee} />,
    },

    {
      key: "attendence",
      label: "Attendance",
      children: <EmployeeProfile_attendence employee={employee} />,
    },
    {
      key: "settings",
      label: "Settings",
      children: (
        <EmployeeProfile_settings
          email={employee.email}
          verified={employee.verified}
          isActive={employee.isActive}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col p-12 rounded-md max-w-full mx-auto">
      {/* Back Button */}
      <div
        onClick={() => {
          if (userPosition === "HR") {
            navigate("/employee/my-team");
          } else {
            navigate("/admin/my-team");
          }
        }}
        className="flex items-center space-x-2 cursor-pointer text-[#4361EE] hover:text-[#2542AA] transition-colors duration-300 group"
      >
        <ArrowBigLeftDash
          color="currentColor"
          strokeWidth={1.5}
          size={28}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        {/* <span className="text-lg">Go Back</span> */}
      </div>

      {/* Profile Section */}
      <div className="flex items-center mt-6 justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={employee.image}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-semibold">{`${employee.firstName} ${employee.lastName}`}</h1>
            <p className="text-[#8C97A8]">{employee.position}</p>
          </div>
        </div>

        {/* Task Stats Section */}
        <div className="grid grid-cols-2 items-center justify-center text-sm text-gray-500 gap-y-2">
          <HiOutlineCalendarDateRange
            size={18}
            className="ml-16"
            color="#8C97A8"
          />

          <span>
            Joined:{" "}
            {employee.dateOfJoining ? employee.dateOfJoining.split("T")[0] : ""}
          </span>

          {/* <GrTasks size={16} className="ml-16" color="#8C97A8" /> */}

          {/* <span className="text-red-500">
            Assigned: {employee.assignedTasks || ""}
          </span>
          <BookCheck size={16} className="ml-16" color="#8C97A8" />

          <span className="text-green-500">
            Completed: {employee.completedTasks || ""}
          </span> */}
        </div>

        {/* Assign Task Button
        <button className="bg-[#4361EE] text-white px-4 py-2 rounded-md">
          +Assign Task
        </button> */}
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto p-6">
        <Tabs defaultActiveKey="profile" items={items} className="antd-tabs" />
      </div>
    </div>
  );
};

export default EmployeeProfile;
