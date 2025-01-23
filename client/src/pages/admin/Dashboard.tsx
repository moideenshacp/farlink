import { Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shared/components/admin/DashBoardSideBar";
import DashBoardTopBar from "../../shared/components/admin/DashBoardTopBar";
import DashboardSettings from "../../components/admin/settingss/DashboardSettings";
import Myteam from "../../components/admin/myTeam/Myteam";
import EmployeeProfile from "../../components/admin/myTeam/EmployeeProfile";
import Billing from "../../components/admin/billing/Billing"
import DashboardOverview from "../../components/admin/overview/DashboardOverview";
import ManageLeave from "../../components/admin/attendence/ManageLeave";
import LeaveSummary from "../../components/admin/leaveSummary/LeaveSummary";
import CreateProject from "../../components/admin/ProjectManagment/CreateProject";
// Content Components
const ManageTasks = () => <div>Manage Tasks Content</div>;
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;
const Meeting = () => <div>Meeting Content</div>;
const Message = () => <div>Message Content</div>;

const MyTeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
     <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-white lg:border-r ">
        <DashBoardSideBar />
      </div>

      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed lg:top-0  lg:left-64 lg:w-[calc(100%-16rem)] bg-white z-20 ">
          <DashBoardTopBar />
        </div>

        {/* Dynamic Content */}
        <main className="flex-1 bg-white p-6 sm: mt-14 lg:pt-14">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/my-team" element={<Myteam />} />
            <Route path="/employee-profile" element={<EmployeeProfile />} />
            <Route path="/leave-summary" element={<LeaveSummary />} />
            <Route path="/manage-leave" element={<ManageLeave/>} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/manage-tasks" element={<ManageTasks />} />
            <Route path="/service-request" element={<ServiceRequest />} />
            <Route path="/realtime-alert" element={<RealTimeAlert />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/message" element={<Message />} />
            <Route path="/setting" element={<DashboardSettings/>} />
            <Route path="/billing" element={<Billing/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MyTeamPage;
