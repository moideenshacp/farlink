import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../pages/admin/Dashboard";
import DashboardOverview from "../../components/admin/overview/DashboardOverview";
import Myteam from "../../components/admin/myTeam/Myteam";
import EmployeeProfile from "../../components/admin/myTeam/EmployeeProfile";
import LeaveSummary from "../../components/admin/leaveSummary/LeaveSummary";
import ManageLeave from "../../components/admin/attendence/ManageLeave";
import CreateProject from "../../components/admin/ProjectManagment/CreateProject";
import DashboardSettings from "../../components/admin/settingss/DashboardSettings";
import Billing from "../../components/admin/billing/Billing";
import TaskSummary from "../../components/admin/TaskManagement/TaskSummary";
import SubscriptionRoute from "../SubscriptionRoute";
import Meeting from "../../components/admin/meeting/Meeting";
import ChatContainer from "../../components/admin/message/Message";
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route index element={<DashboardOverview />} />
      <Route path="/my-team" element={<Myteam />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
      <Route path="/leave-summary" element={<LeaveSummary />} />
      <Route path="/manage-leave" element={<ManageLeave />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/manage-tasks" element={<TaskSummary />} />
      <Route path="/service-request" element={<ServiceRequest />} />
      <Route path="/realtime-alert" element={<RealTimeAlert />} />
      <Route path="/setting" element={<DashboardSettings />} />
      <Route path="/billing" element={<Billing />} />


      <Route element={<SubscriptionRoute />}> 
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/message" element={<ChatContainer />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
