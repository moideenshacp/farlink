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
                    to="/superAdmin/"
                    onClick={() => handleLinkClick("/superAdmin/")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/"
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
                    to="/superAdmin/All-organization"
                    onClick={() => handleLinkClick("/superAdmin/All-organization")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/All-organization"
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
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                      />
                    </svg>
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
                    to="/superAdmin/billing"
                    onClick={() => handleLinkClick("/superAdmin/billing")}
                    className={`text-[#0B0B0B] font-medium px-4 py-2 rounded-md flex items-center gap-3 ${
                      selectedPath === "/superAdmin/billing"
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
