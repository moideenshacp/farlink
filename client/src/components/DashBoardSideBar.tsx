import { Link } from "react-router-dom"
import logo from "../assets/EmailLogo.png";
import { useState } from "react";


const DashBoardSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
        <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 bg-white border-r border-gray-200 h-screen z-40 lg:translate-x-0 lg:static lg:block`}
      >
        <div className="text-center mb-6">
          <img src={logo} alt="FarLink Logo" className="mx-auto w-60  mb-1" />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {/* Realtime Section */}
            <li>
              <p className="text-xs ml-2  text-[#8C97A8] font-semibold uppercase">
                Realtime
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team"
                    className="block text-[#0B0B0B] font-medium px-4 py-2  rounded-md"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/my-team"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
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
                    to="/my-team/leave-summary"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Leave Summary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-leave"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Manage Leave
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
                    to="/my-team/create-project"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-tasks"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
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
                    to="/my-team/service-request"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Service Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/realtime-alert"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
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
                    to="/my-team/meeting"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Meetings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/message"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
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
                    to="/my-team/setting"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/billing"
                    className="block text-[#0B0B0B] font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
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
  )
}

export default DashBoardSideBar