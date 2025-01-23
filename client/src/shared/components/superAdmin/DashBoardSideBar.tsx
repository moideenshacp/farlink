import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/EmailLogo.png";
import { SetStateAction, useState } from "react";
import { AiOutlinePieChart } from "react-icons/ai";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";

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
        } transition-transform duration-300 ease-in-out w-64 bg-white border-r shadow-md border-gray-200 h-screen z-40 lg:translate-x-0 lg:static lg:block`}
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
                    to="/superAdmin/"
                    onClick={() => handleLinkClick("/superAdmin/")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/"
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
                    to="/superAdmin/All-organization"
                    onClick={() =>
                      handleLinkClick("/superAdmin/All-organization")
                    }
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/All-organization"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <CgOrganisation size={16} color="#8C97A8" />
                    All Organizations
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
                    to="/superAdmin/setting"
                    onClick={() => handleLinkClick("/superAdmin/setting")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/setting"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
                        : ""
                    }`}
                  >
                    <MdOutlineSettingsSuggest size={16} color="#8C97A8" />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/superAdmin/billing"
                    onClick={() => handleLinkClick("/superAdmin/billing")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/billing"
                        ? "text-[#4361EE]  bg-blue-50 border-l-4 border-[#4361EE]"
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
