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
const Overview = () => <div>Overview Content</div>;
const CreateProject = () => <div>Create Project Content</div>;
const ManageTasks = () => <div>Manage Tasks Content</div>;
const ServiceRequest = () => <div>ServiceRequest Content</div>;
const MyTask = () => <div>My Tasks Content</div>;
const RequestService = () => <div>ServiceRequest Content</div>;
const RealTimeAlert = () => <div>RealTimeAlert Content</div>;
const Meeting = () => <div>Meeting Content</div>;
const Message = () => <div>Message Content</div>;
const EmployeeRoutes = () => (
  <Routes>
    <Route path="/" element={<EmployeeDashboard />}>
      <Route index element={<Overview />} />
      <Route path="/my-team" element={<Myteam />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
      <Route path="/leave-summary" element={<LeaveSummary />} />
      <Route path="/manage-leave" element={<ManageLeave />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/manage-tasks" element={<ManageTasks />} />
      <Route path="/service-request" element={<ServiceRequest />} />
      <Route path="/realtime-alert" element={<RealTimeAlert />} />
      <Route path="/" element={<Overview />} />
      <Route path="/attendence-summary" element={<AttendanceSummary />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/my-projects" element={<Myproject />} />
      <Route path="/my-tasks" element={<MyTask />} />
      <Route path="/request-sevice" element={<RequestService />} />
      <Route path="/realtime-alert" element={<RealTimeAlert />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/message" element={<Message />} />
      <Route path="/setting" element={<DashboardSettings />} />
    </Route>
  </Routes>
);

export default EmployeeRoutes;
