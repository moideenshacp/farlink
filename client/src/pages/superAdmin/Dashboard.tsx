import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../../shared/components/superAdmin/DashBoardSideBar";
import DashBoardTopBar from "../../shared/components/superAdmin/DashBoardTopBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-white lg:border-r lg:z-10">
        <DashBoardSideBar />
      </div>

      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed lg:top-0  lg:left-64 lg:w-[calc(100%-16rem)] bg-white z-20 ">
          <DashBoardTopBar />
        </div>

        <main className="flex-1 bg-white p-6 sm: mt-14 lg:pt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
