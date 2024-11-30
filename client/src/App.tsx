import {BrowserRouter ,Route,Routes } from "react-router-dom"
import Home from "./pages/LandingPages/Home"
import SignUp from "./pages/LandingPages/SignUp"
import Login from "./pages/LandingPages/Login"
import EmailVerified from "./pages/admin/EmailVerified"
import Step1 from "./pages/admin/Step1"
import Step2 from "./pages/admin/Step2"
import Step3 from "./pages/admin/Step3"
import AdminDashboard from "./pages/admin/Dashboard"
import VerifyMail from "./pages/admin/VerifyMail"
import Dashboard from "./pages/superAdmin/Dashboard"

function App() {

  return (
    <BrowserRouter>

    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/verify-email" element={<EmailVerified/>} />
        <Route path="/verifyEmail-msg" element={<VerifyMail/>} />
        <Route path="/step-1" element={<Step1/>} />
        <Route path="/step-2" element={<Step2/>} />
        <Route path="/step-3" element={<Step3/>} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/superAdmin/*" element={<Dashboard />} />
      </Routes>
    </div>

    </BrowserRouter>
  )
}

export default App
