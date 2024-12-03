import { Link } from "react-router-dom"
import logo from "../../../assets/EmailLogo.png";

const InvalidForgetPass = () => {
  return (
    <div>
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
          <img
            src={logo}
            alt="FarLink Logo"
            className="w-56 ml-12 mx-auto mb-6"
          />
        <h1 className="text-2xl font-bold text-[#08AD36]">
          Your Verification link is expired..
        </h1>
        <p className="mt-4 text-[#000000]">
          Your link to reset-password has been expired. <br />
          Please request once more.!!
        </p>
        <Link to="/sign-up">
          <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Go to sign-up
          </button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default InvalidForgetPass