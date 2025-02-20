import { Route, Routes } from "react-router-dom";
import EmployeeDashboard from "../../pages/employee/EmployeeDashboard";
import Myteam from "../../components/admin/myTeam/Myteam";
import EmployeeProfile from "../../components/admin/myTeam/EmployeeProfile";
import LeaveSummary from "../../components/admin/leaveSummary/LeaveSummary";
import ManageLeave from "../../components/admin/attendence/ManageLeave";
import AttendanceSummary from "../../components/employee/attendence/AttendenceSummary";
import ApplyLeave from "../../components/employee/attendence/ApplyLeave";
import DashboardSettings from "../../components/employee/DashboardSettings";
import Myproject from "../../components/employee/projectManagment/Myproject";
import TaskSummary from "../../components/employee/TaskManagment/TaskSummary";
import SubscriptionRoute from "../SubscriptionRoute";
import Meetings from "../../components/employee/meeting/Meetings";
import DashboardOverview from "../../components/employee/overview/DashboardOverview";
import CreateProject from "../../components/admin/ProjectManagment/CreateProject";
import ChatContainer from "../../shared/components/message/Message";
import NotFound from "../../pages/404-page/NotFound";
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const RequestService = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;
const EmployeeRoutes = () => (
  <Routes>
              <Route path="*" element={<NotFound routeType="employee" />} />

    <Route path="/" element={<EmployeeDashboard />}>
      <Route index element={<DashboardOverview />} />
      <Route path="/my-team" element={<Myteam />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
      <Route path="/leave-summary" element={<LeaveSummary />} />
      <Route path="/manage-leave" element={<ManageLeave />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/manage-tasks" element={<TaskSummary />} />
      <Route path="/service-request" element={<ServiceRequest />} />
      <Route path="/realtime-alert" element={<RealTimeAlert />} />
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/attendence-summary" element={<AttendanceSummary />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/my-projects" element={<Myproject />} />
      <Route path="/my-tasks" element={<TaskSummary />} />
      <Route path="/request-sevice" element={<RequestService />} />
      <Route path="/realtime-alert" element={<RealTimeAlert />} />
      <Route path="/setting" element={<DashboardSettings />} />

      <Route element={<SubscriptionRoute />}>
        <Route path="/message" element={<ChatContainer />} />
        <Route path="/meeting" element={<Meetings />} />
      </Route>
    </Route>
  </Routes>
);

export default EmployeeRoutes;
