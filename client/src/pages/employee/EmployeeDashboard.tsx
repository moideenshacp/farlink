import { Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shared/components/employee/DashBoardSideBar";
import DashBoardTopBar from "../../shared/components/employee/DashBoardTopBar";
import DashboardSettings from "../../components/employee/DashboardSettings";
import AttendanceSummary from "../../components/employee/attendence/AttendenceSummary";
import ApplyLeave from "../../components/employee/attendence/ApplyLeave";
import Myteam from "../../components/admin/myTeam/Myteam";
import EmployeeProfile from "../../components/admin/myTeam/EmployeeProfile";
import LeaveSummary from "../../components/admin/leaveSummary/LeaveSummary";
import ManageLeave from "../../components/admin/attendence/ManageLeave";
// Content Components
const Overview = () => <div>Overview Content</div>;
const CreateProject = () => <div>Create Project Content</div>;
const ManageTasks = () => <div>Manage Tasks Content</div>;
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const MyProject = () => <div>My Project Content</div>;
const MyTask = () => <div>My Tasks Content</div>;
const RequestService = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;
const Meeting = () => <div>Meeting Content</div>;
const Message = () => <div>Message Content</div>;

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
     <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-white lg:border-r">
        <DashBoardSideBar />
      </div>

      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed lg:top-0  lg:left-64 lg:w-[calc(100%-16rem)] bg-white z-auto ">
          <DashBoardTopBar />
        </div>

        {/* Dynamic Content */}
        <main className="flex-1 bg-white p-6 sm: mt-14 lg:pt-14">
          <Routes>
          <Route path="/my-team" element={<Myteam />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/leave-summary" element={<LeaveSummary />} />
          <Route path="/manage-leave" element={<ManageLeave/>} />
             <Route path="/create-project" element={<CreateProject />} />
                      <Route path="/manage-tasks" element={<ManageTasks />} />
                      <Route path="/service-request" element={<ServiceRequest />} />
                      <Route path="/realtime-alert" element={<RealTimeAlert />} />
            <Route path="/" element={<Overview />} />
            <Route path="/attendence-summary" element={<AttendanceSummary />} />
            <Route path="/apply-leave" element={<ApplyLeave />} />
            <Route path="/my-projects" element={<MyProject />} />
            <Route path="/my-tasks" element={<MyTask />} />
            <Route path="/request-sevice" element={<RequestService />} />
            <Route path="/realtime-alert" element={<RealTimeAlert />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/message" element={<Message />} />
            <Route path="/setting" element={<DashboardSettings/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
