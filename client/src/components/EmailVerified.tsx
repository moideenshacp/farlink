import { Link } from 'react-router-dom'
import logo from '../assets/EmailLogo.png'

const EmailVerified = () => {
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
        <img
          src={logo}
          alt="FarLink Logo"
          className="w-56 ml-12 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-[#08AD36]">Email Verified!</h1>
        <p className="mt-4 text-[#000000]">
          Your email has been successfully verified. <br />
          Welcome to the FarLink App!
        </p>
        <Link to='/step-1' >
        <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Set up your account now
        </button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default EmailVerified