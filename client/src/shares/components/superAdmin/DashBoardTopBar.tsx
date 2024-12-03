import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/user/userSlice";

const DashBoardTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.data.message === "Logged out successfully") {
      dispatch(logout());
      navigate("/sign-in", { replace: true });
    }
  };

  const location = useLocation();
  return (
    <div>
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          {location.pathname === "/superAdmin/" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Overview
            </h1>
          ) : location.pathname === "/superAdmin/All-companies" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Companies
            </h1>
          ) : location.pathname === "/superAdmin/setting" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Settings
            </h1>
          ) : (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Billing
            </h1>
          )}
          <div className="flex items-center gap-12">
            <div className="flex items-center ml-12">
              <input
                type="text"
                placeholder="Search anything..."
                className="border border-gray-300 rounded-md px-4 py-2 text-[#8C97A8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <svg
                className="h-8 w-8 text-[#8C97A8] -ml-10"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
            <button aria-label="Notifications" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#8C97A8"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="relative inline-block text-left">
              <div>
                <button onClick={toggleDropdown} className="flex items-center">
                  <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-10 h-7 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <svg
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 lg:w-48 sm: w-36 rounded-md shadow-lg bg-white ring-1 ring-[#4361EE] ring-opacity-5">
                  <div className="py-1">
                    <a
                      onClick={handleLogout}
                      className=" px-4 py-2 text-sm text-gray-700 flex items-center"
                    >
                      <svg
                        className="h-4 w-4 text-[#4361EE] mr-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                      </svg>
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashBoardTopBar;
