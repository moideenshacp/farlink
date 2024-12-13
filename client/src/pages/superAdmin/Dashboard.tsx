import { Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shares/components/superAdmin/DashBoardSideBar";
import DashBoardTopBar from "../../shares/components/superAdmin/DashBoardTopBar";
import DashboardSettings from "../../components/superAdmin/DashboardSettings";
import DashboardAllOrg from "../../components/superAdmin/DashboardAllOrg";
import CompanyDetails from "../../components/superAdmin/CompanyDetails";
import DashboardOverview from "../../components/superAdmin/DashboardOverview";

const Billing = () => <div>Billing Content</div>;

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
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/All-organization" element={<DashboardAllOrg />} />
            <Route path="/setting" element={<DashboardSettings />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/organization-details" element={<CompanyDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
