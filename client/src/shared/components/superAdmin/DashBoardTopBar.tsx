import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/user/userSlice";
import { RootState } from "../../../redux/store";
import NotificationDropdown from "../NotificationDropdown";

const DashBoardTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

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
          ) : location.pathname === "/superAdmin/All-organization" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              All Organzations
            </h1>
          ) : location.pathname === "/superAdmin/organization-details" ? (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Organization details
            </h1>
          ) : (
            <h1 className="text-xl font-semibold text-gray-700 lg:block sm: hidden">
              Billing
            </h1>
          )}
          <div className="flex items-center p-2 sm: gap-56 lg:gap-12">
          <div className="ml-14" >
            <NotificationDropdown />
            </div>
            <div className="relative inline-block text-left">
              <div>
                <button onClick={toggleDropdown} className="flex items-center">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
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
                      onClick={handleLogout}
                      className=" px-4 py-2 text-sm text-gray-700 flex items-center cursor-pointer"
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
