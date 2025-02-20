import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/superAdmin/Dashboard";
import DashboardOverview from "../../components/superAdmin/DashboardOverview";
import DashboardAllOrg from "../../components/superAdmin/DashboardAllOrg";
import DashboardSettings from "../../components/superAdmin/DashboardSettings";
import PaymentHistoryAdmin from "../../components/superAdmin/Billings";
import CompanyDetails from "../../components/superAdmin/CompanyDetails";
import NotFound from "../../pages/404-page/NotFound";

const SuperAdminRoutes = () => (
  <Routes>
              <Route path="*" element={<NotFound routeType="superadmin" />} />

    <Route path="/" element={<Dashboard />}>
      <Route index element={<DashboardOverview />} />
      <Route path="/All-organization" element={<DashboardAllOrg />} />
      <Route path="/setting" element={<DashboardSettings />} />
      <Route path="/billing" element={<PaymentHistoryAdmin />} />
      <Route path="/organization-details" element={<CompanyDetails />} />
    </Route>
  </Routes>
);

export default SuperAdminRoutes;
