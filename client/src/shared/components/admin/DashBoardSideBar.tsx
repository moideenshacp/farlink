import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/EmailLogo.png";
import { SetStateAction, useState } from "react";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { GrTasks } from "react-icons/gr";
// import { GiAutoRepair } from "react-icons/gi";
// import { MdAddAlert } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { MdPayments } from "react-icons/md";

const DashBoardSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  const handleLinkClick = (path: SetStateAction<string>) => {
    setSelectedPath(path);
  };

  return (
    <div>
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }   transition-transform duration-300 ease-in-out shadow-md w-64 bg-white border-r   border-gray-200 h-screen z-40 lg:translate-x-0 lg:static lg:block`}
      >
        <div className="text-center mb-6">
          <img src={logo} alt="FarLink Logo" className="mx-auto w-60  mb-1" />
        </div>
        <nav className="-mt-1">
          <ul className="space-y-1">
            {/* Realtime Section */}
            <li>
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Realtime
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/"
                    onClick={() => handleLinkClick("/admin/")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <AiOutlinePieChart size={16} color="#8C97A8" />
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/my-team"
                    onClick={() => handleLinkClick("/admin/my-team")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/my-team"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <RiTeamLine size={16} color="#8C97A8" />
                    My Team
                  </Link>
                </li>
              </ul>
            </li>

            {/* Leave Management Section */}
            <li className="mt-4">
              <p className="text-xs ml-2 text-[#8C97A8] font-semibold uppercase">
                Leave Management
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/leave-summary"
                    onClick={() => handleLinkClick("/admin/leave-summary")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/leave-summary"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdOutlineSummarize size={16} color="#8C97A8" />
                    Leave Summary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage-leave"
                    onClick={() => handleLinkClick("/admin/manage-leave")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/manage-leave"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE] "
                        : ""
                    }`}
                  >
                    <MdOutlinePolicy size={16} color="#8C97A8" />
                    Manage Policy
                  </Link>
                </li>
              </ul>
            </li>

            {/* Project Management Section */}
            <li className="mt-4">
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Project Management
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/create-project"
                    onClick={() => handleLinkClick("/admin/create-project")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/create-project"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <VscGitPullRequestCreate size={16} color="#8C97A8" />
                    Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage-tasks"
                    onClick={() => handleLinkClick("/admin/manage-tasks")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/manage-tasks"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <GrTasks size={16} color="#8C97A8" />
                    Manage Tasks
                  </Link>
                </li>
              </ul>
            </li>

            {/* support and notification hub */}
            {/* <li className="mt-4">
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Support and Notifications Hub
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/service-request"
                    onClick={() => handleLinkClick("/admin/service-request")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/service-request"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <GiAutoRepair size={16} color="#8C97A8" />
                    Service Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/realtime-alert"
                    onClick={() => handleLinkClick("/admin/realtime-alert")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/realtime-alert"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdAddAlert size={16} color="#8C97A8" />
                    Real Time Alert
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* communication */}
            <li className="mt-4">
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Communications
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/meeting"
                    onClick={() => handleLinkClick("/admin/meeting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/meeting"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <IoIosVideocam size={16} color="#8C97A8" />
                    Meetings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/message"
                    onClick={() => handleLinkClick("/admin/message")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/message"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <TiMessages size={16} color="#8C97A8" />
                    Messages
                  </Link>
                </li>
              </ul>
            </li>

            {/* Configuration */}
            <li className="mt-4">
              <p className="text-xs ml-2 text-[#8C97A8] font-semibold uppercase">
                Configuration
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/setting"
                    onClick={() => handleLinkClick("/admin/setting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/setting"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdOutlineSettingsSuggest size={16} color="#8C97A8" />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/billing"
                    onClick={() => handleLinkClick("/admin/billing")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/billing"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdPayments size={16} color="#8C97A8" />
                    Billing
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-gray-700 focus:outline-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default DashBoardSideBar;
