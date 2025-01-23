import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/EmailLogo.png";
import { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { AiOutlinePieChart } from "react-icons/ai";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { MdOutlineSummarize } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { GrTasks } from "react-icons/gr";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { GiAutoRepair } from "react-icons/gi";
import { MdAddAlert } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { MdOutlineSettingsSuggest } from "react-icons/md";

const DashBoardSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);
  const userPosition = useSelector(
    (state: RootState) => state.user?.user?.position
  );

  const handleLinkClick = (path: SetStateAction<string>) => {
    setSelectedPath(path);
  };

  return (
    <div>
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }   transition-transform duration-500 ease-in-out w-64 bg-white border-r shadow-md  border-gray-200 h-screen z-40 lg:translate-x-0 lg:static lg:block`}
      >
        <div className="text-center mb-6">
          <img src={logo} alt="FarLink Logo" className="mx-auto w-60  mb-1" />
        </div>
        <nav className="mt-1">
          <ul className="space-y-1">
            {/* Realtime Section */}
            <li>
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Realtime
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/employee/"
                    onClick={() => handleLinkClick("/employee/")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <AiOutlinePieChart size={16} color="#8C97A8" />
                    Overview
                  </Link>
                </li>

                {userPosition === "HR" && (
                  <li>
                    <Link
                      to="/employee/my-team"
                      onClick={() => handleLinkClick("/employee/my-team")}
                      className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                        selectedPath === "/employee/my-team"
                          ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                          : ""
                      }`}
                    >
                      <RiTeamLine size={16} color="#8C97A8" />
                      My-Team
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            {/* Leave Management Section */}
            <li className="mt-4">
              <p className="text-xs ml-2 text-[#8C97A8] font-semibold uppercase">
                Leave Management
              </p>
              <ul className="mt-1 space-y-1">
                {userPosition === "HR" && (
                  <li>
                    <Link
                      to="/employee/leave-summary"
                      onClick={() => handleLinkClick("/employee/leave-summary")}
                      className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                        selectedPath === "/employee/leave-summary"
                          ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                          : ""
                      }`}
                    >
                      <MdOutlineSummarize size={16} color="#8C97A8" />
                      Team Leave Summary
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/employee/attendence-summary"
                    onClick={() =>
                      handleLinkClick("/employee/attendence-summary")
                    }
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/attendence-summary"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdOutlineSummarize size={16} color="#8C97A8" />
                    Attendence Summary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employee/apply-leave"
                    onClick={() => handleLinkClick("/employee/apply-leave")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/apply-leave"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <VscGitPullRequestNewChanges size={16} color="#8C97A8" />
                    Apply Leave
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
                    to={
                      userPosition === "HR"
                        ? "/employee/create-project"
                        : "/employee/my-projects"
                    }
                    onClick={() =>
                      handleLinkClick(
                        userPosition === "HR"
                          ? "/employee/create-project"
                          : "/employee/my-projects"
                      )
                    }
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath ===
                      (userPosition === "HR"
                        ? "/employee/create-project"
                        : "/employee/my-projects")
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <VscGitPullRequestCreate size={16} color="#8C97A8" />

                    {userPosition === "HR" ? "Create Projects" : "My Projects"}
                  </Link>
                </li>

                <li>
                  <Link
                    to={
                      userPosition === "HR"
                        ? "/employee/manage-tasks"
                        : "/employee/my-tasks"
                    }
                    onClick={() =>
                      handleLinkClick(
                        userPosition === "HR"
                          ? "/employee/manage-tasks"
                          : "/employee/my-tasks"
                      )
                    }
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath ===
                      (userPosition === "HR"
                        ? "/employee/manage-tasks"
                        : "/employee/my-tasks")
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <GrTasks size={16} color="#8C97A8" />

                    {userPosition === "HR" ? "Manage Tasks" : "My Tasks"}
                  </Link>
                </li>
              </ul>
            </li>

            {/* support and notification hub */}
            <li className="mt-4">
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Support and Notifications Hub
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/employee/request-sevice"
                    onClick={() => handleLinkClick("/employee/request-sevice")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/request-sevice"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <GiAutoRepair size={16} color="#8C97A8" />
                    Request Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employee/realtime-alert"
                    onClick={() => handleLinkClick("/employee/realtime-alert")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/realtime-alert"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdAddAlert size={16} color="#8C97A8" />
                    Real Time Alert
                  </Link>
                </li>
              </ul>
            </li>

            {/* communication */}
            <li className="mt-4">
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Communications
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/employee/meeting"
                    onClick={() => handleLinkClick("/employee/meeting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/meeting"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <IoIosVideocam size={16} color="#8C97A8" />
                    Meetings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employee/message"
                    onClick={() => handleLinkClick("/employee/message")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/message"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
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
                    to="/employee/setting"
                    onClick={() => handleLinkClick("/employee/setting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/employee/setting"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdOutlineSettingsSuggest size={16} color="#8C97A8" />
                    Settings
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
