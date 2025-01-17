import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/EmailLogo.png";
import { SetStateAction, useState } from "react";

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                      />
                    </svg>
                    Manage Tasks
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
                    to="/admin/service-request"
                    onClick={() => handleLinkClick("/admin/service-request")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/service-request"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                      />
                    </svg>
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
                    to="/admin/meeting"
                    onClick={() => handleLinkClick("/admin/meeting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/admin/meeting"
                        ? "text-[#4361EE] bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
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
