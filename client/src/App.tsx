import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/LandingPages/Home";
import SignUp from "./pages/LandingPages/SignUp";
import Login from "./pages/LandingPages/Login";
import EmailVerified from "./shared/components/email/EmailVerified";
import Step1 from "./components/admin/companyRegister/Step1";
import Step2 from "./components/admin/companyRegister/Step2";
import Step3 from "./components/admin/companyRegister/Step3";
import VerifyMail from "./pages/admin/VerifyMail";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import SuperAdminPrivateRoute from "./routes/SuperAdminPrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ForgetPassEmail from "./shared/components/landingPageComponents/ForgetPassEmail";
import ForgetPassword from "./shared/components/landingPageComponents/ForgetPassword";
import ResetPassword from "./shared/components/landingPageComponents/ResetPassword";
import InvalidForgetPass from "./shared/components/landingPageComponents/InvalidForgetPass";
import OrganizationPrivateRoute from "./routes/OrganizationPrivateRoute";
import SetUpPassword from "./pages/employee/SetUpPassword";
import EmployeeLogin from "./pages/LandingPages/EmployeeLogin";
import SuccessPayment from "./pages/admin/SuccessPayment";
import AdminRoutes from "./routes/adminRoute/AdminRoutes";
import EmployeeRoutes from "./routes/employeeRoute/EmployeeRoutes";
import SuperAdminRoutes from "./routes/superAdminRoute/SuperAdminRoutes";
import EmployeePrivateRoute from "./routes/EmployeePrivateRoute";
import VideoCall from "./shared/components/VideoCall";
import SubscriptionRoute from "./routes/SubscriptionRoute";
import NotFound from "./pages/404-page/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerified />} />
            <Route path="/verifyEmail-msg" element={<VerifyMail />} />
            <Route path="/forget-password" element={<ForgetPassEmail />} />
            <Route path="/forget-password-msg" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/set-password" element={<SetUpPassword />} />
            <Route element={<OrganizationPrivateRoute />}>
              <Route path="/step-1" element={<Step1 />} />
              <Route path="/step-2" element={<Step2 />} />
            </Route>
            <Route
              path="/invalid-forget-password"
              element={<InvalidForgetPass />}
            />
          </Route>
          {/*================================================================================================================================== */}
          <Route element={<SubscriptionRoute />}>
            <Route path="/video-call" element={<VideoCall />} />
          </Route>
          <Route element={<OrganizationPrivateRoute />}>
            <Route path="/step-3" element={<Step3 />} />
          </Route>

          {/*================================================================================================================================== */}

          <Route element={<AdminPrivateRoute />}>
            <Route path="/success" element={<SuccessPayment />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>
          <Route element={<EmployeePrivateRoute />}>
            <Route path="/employee/*" element={<EmployeeRoutes />} />
          </Route>

          {/*================================================================================================================================== */}
          <Route element={<SuperAdminPrivateRoute />}>
            <Route path="/superAdmin/*" element={<SuperAdminRoutes />} />
          </Route>
          {/*================================================================================================================================== */}
                  {/* 404 Page Route */}
                  <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
