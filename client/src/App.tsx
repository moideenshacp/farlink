import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/LandingPages/Home";
import SignUp from "./pages/LandingPages/SignUp";
import Login from "./pages/LandingPages/Login";
import EmailVerified from "./pages/admin/EmailVerified";
import Step1 from "./components/admin/Step1";
import Step2 from "./components/admin/Step2";
import Step3 from "./components/admin/Step3";
import AdminDashboard from "./pages/admin/Dashboard";
import VerifyMail from "./pages/admin/VerifyMail";
import Dashboard from "./pages/superAdmin/Dashboard";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import SuperAdminPrivateRoute from "./routes/SuperAdminPrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ForgetPassEmail from "./shares/components/landingPageComponents/ForgetPassEmail";
import ForgetPassword from "./shares/components/landingPageComponents/ForgetPassword";
import ResetPassword from "./shares/components/landingPageComponents/ResetPassword";
import InvalidForgetPass from "./shares/components/landingPageComponents/InvalidForgetPass";
import OrganizationPrivateRoute from "./routes/OrganizationPrivateRoute";

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

          <Route element={<OrganizationPrivateRoute />}>
            <Route path="/step-3" element={<Step3 />} />
          </Route>

{/*================================================================================================================================== */}

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

{/*================================================================================================================================== */}
          <Route element={<SuperAdminPrivateRoute />}>
            <Route path="/superAdmin/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
