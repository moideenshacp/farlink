import {  Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shares/components/superAdmin/DashBoardSideBar";
import DashBoardTopBar from "../../shares/components/superAdmin/DashBoardTopBar";

// Content Components
const Overview = () => <div>Overview Content</div>;
const AllCompanies = () => <div>All companies Content</div>;
const Setting = () => <div>Setting Content</div>;
const Billing = () => <div>Billing Content</div>;

const Dashboard = () => {


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashBoardSideBar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashBoardTopBar/>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/superAdmin/dashboard/" element={<Overview />} />
            <Route path="/All-companies" element={<AllCompanies />} />
            <Route path="/superAdmin/setting" element={<Setting />} />
            <Route path="/superAdmin/billing" element={<Billing />} />
          </Routes>
        </main>
      </div>

      
    </div>
  );
};

export default Dashboard;
