import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/user/userSlice";
import { RootState } from "../../../redux/store";
import { FiLogOut } from "react-icons/fi";
import NotificationDropdown from "../NotificationDropdown";

const DashBoardTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  console.log("name of user", user?.image);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    dispatch(logout());
    const res = await logoutUser();

    if (res.data.message === "Logged out successfully") {
      navigate("/sign-in", { replace: true });
    }
  };

  const location = useLocation();
  return (
    <div>
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          {location.pathname === "/admin/" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Overview
            </h1>
          ) : location.pathname === "/admin/my-team" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              My Team
            </h1>
          ) : location.pathname === "/admin/leave-summary" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Leave Summary
            </h1>
          ) : location.pathname === "/admin/manage-leave" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Manage Policy
            </h1>
          ) : location.pathname === "/admin/create-project" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Create Project
            </h1>
          ) : location.pathname === "/admin/manage-tasks" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Manage Tasks
            </h1>
          ) : location.pathname === "/admin/service-request" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Service Requests
            </h1>
          ) : location.pathname === "/admin/realtime-alert" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Real Time Alert
            </h1>
          ) : location.pathname === "/admin/meeting" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Meetings
            </h1>
          ) : location.pathname === "/admin/message" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Messages
            </h1>
          ) : location.pathname === "/admin/setting" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Settings
            </h1>
          ) : location.pathname === "/admin/employee-profile" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Employee Profile
            </h1>
          ) : (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Billing
            </h1>
          )}
          <div className="flex items-center gap-12">
            <div className="flex items-center ml-12 relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="border border-gray-300 rounded-md px-4 py-2 text-[#8C97A8] focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#8C97A8"
                className="absolute left-3 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>

            <NotificationDropdown/>
            <div className="relative inline-block text-left">
              <div>
                <button onClick={toggleDropdown} className="flex items-center">
                  {user?.image ? (
                    <Link to="/admin/setting">
                      <img
                        src={user.image}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                  {/* Arrow icon */}
                  <svg
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="#8C97A8"
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
                    <div className="px-4 py-2 text-sm text-gray-700 flex items-center">
                      <span className="text-gray-500">Hello,</span>
                      <span className="ml-2 font-medium text-gray-800">
                        {user?.name}
                      </span>{" "}
                    </div>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className=" px-4 py-2 gap-2 text-sm text-gray-700 flex items-center"
                    >
                      <FiLogOut size={16} color="#4361EE" />
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
