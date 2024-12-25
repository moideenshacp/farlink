import { Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shared/components/employee/DashBoardSideBar";
import DashBoardTopBar from "../../shared/components/employee/DashBoardTopBar";
import DashboardSettings from "../../components/employee/DashboardSettings";
// Content Components
const Overview = () => <div>Overview Content</div>;
const LeaveSummary = () => <div>Leave Summary Content</div>;
const ApplyLeave = () => <div>Apply Leave Content</div>;
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
            <Route path="/" element={<Overview />} />
            <Route path="/leave-summary" element={<LeaveSummary />} />
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
