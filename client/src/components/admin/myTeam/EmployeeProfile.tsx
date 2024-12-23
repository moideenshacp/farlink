import { useState } from "react";
import EmployeeProfile_Profile from "./EmployeeProfile_Profile";
import EmployeeProfile_tasks from "./EmployeeProfile_tasks";
import EmployeeProfile_attendence from "./EmployeeProfile_attendence";
import EmployeeProfile_settings from "./EmployeeProfile_settings";
import { useLocation } from "react-router-dom";


const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
    const location = useLocation();
    const { employee } = location.state || {};

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EmployeeProfile_Profile employee={employee} />;
      case "Tasks":
        return <EmployeeProfile_tasks />;
      case "Attendence":
        return <EmployeeProfile_attendence />;
      case "Settings":
        return <EmployeeProfile_settings />;
      default:
        return <div>Select a section</div>;
    }
  };

  console.log("employeee from up",employee);
  
 

  return (
    <div className="flex flex-col bg-white shadow-md p-16 rounded-md max-w-full mx-auto">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-6">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Joined: {employee.dateOfJoining.split("T")[0] || ""}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="size-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          <span className="text-red-500">
            Assigned: {employee.assignedTasks || ""}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="size-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
          <span className="text-green-500">
            Completed: {employee.completedTasks || ""}
          </span>
        </div>

        {/* Assign Task Button */}
        <button className="bg-[#4361EE] text-white px-4 py-2 rounded-md">
          +Assign Task
        </button>
      </div>

      {/* Details Section */}
      <div className="container mx-auto p-6">
        <div className="flex space-x-6 mb-6">
          {["profile", "Tasks", "Attendence", "Settings"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-[#4361EE] text-[#4361EE]"
                  : "text-[#6A7181]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <div className="flex mb-6">
            
          <div className="ml-6 w-full">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
