import { Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../../shares/components/admin/DashBoardSideBar";
import DashBoardTopBar from "../../shares/components/admin/DashBoardTopBar";

// Content Components
const Overview = () => <div>Overview Content</div>;
const MyTeam = () => <div>My Team Content</div>;
const LeaveSummary = () => <div>Leave Summary Content</div>;
const ManageLeave = () => <div>Manage Leave Content</div>;
const CreateProject = () => <div>Create Project Content</div>;
const ManageTasks = () => <div>Manage Tasks Content</div>;
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;
const Meeting = () => <div>Meeting Content</div>;
const Message = () => <div>Message Content</div>;
const Setting = () => <div>Setting Content</div>;
const Billing = () => <div>Billing Content</div>;

const MyTeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashBoardSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashBoardTopBar />

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/admin/" element={<Overview />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/leave-summary" element={<LeaveSummary />} />
            <Route path="/manage-leave" element={<ManageLeave />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/manage-tasks" element={<ManageTasks />} />
            <Route path="/service-request" element={<ServiceRequest />} />
            <Route path="/realtime-alert" element={<RealTimeAlert />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/message" element={<Message />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MyTeamPage;
