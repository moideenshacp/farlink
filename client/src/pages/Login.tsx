import { Link } from 'react-router-dom';
import logo from '../assets/farlink.png';
import signup from '../assets/signUp.jpg'
import Footer from '../components/Footer';
import Header from '../components/Header';
import {  FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

const Login = () => {
  return (
    
    <div>
    <div className="flex flex-col lg:flex-row">
      <Header />

      <div className="flex flex-col justify-center h-auto lg:h-[480px] w-full lg:w-[50%] bg-[#F8FAFF] p-6 lg:p-12">
        <div className="flex items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 lg:w-36 lg:h-36 sm: mt-20 lg:mt-96 lg:-ml-12 sm: -ml-5"
          />
          <h1 className="lg:mt-96 sm: mt-20 text-xl lg:text-4xl font-bold text-[#172C56] lg:-ml-8">
            FarL<span className="text-[#4361EE]">i</span>nk
          </h1>
        </div>
        <h2 className="text-lg lg:text-3xl font-semibold text-[#172C56] mt-2 lg:mt-0">
          SIGN IN
        </h2>

        <form className="mt-6 space-y-4">


          <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
            <FaEnvelope className="text-[#ADB0CD] mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 outline-none text-sm text-[#969AB8]"
            />
          </div>

          <div className="flex items-center border border-[#E0E2E9] rounded-lg px-3 py-2 bg-white">
            <FaLock className="text-[#ADB0CD] mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 outline-none text-sm text-[#969AB8]"
            />
          </div>



          <button
            type="submit"
            className="w-full bg-[#4361EE] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <br />
        <p className="text-[#4361EE] text-center">Forgot password?</p>

        <div className="flex flex-col items-center mt-4 space-y-4">
          <div className="flex items-center w-full">
            <div className="h-px bg-gray-300 flex-1"></div>
            <p className="text-gray-500 px-3">OR</p>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full border border-[#E0E2E9] bg-white py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
          >
            <FcGoogle className="text-2xl mr-2" />
            Continue with Google
          </button>
        </div>
        <br />
        <p className="text-[#969AB8] text-center">Don’t have an account?<Link to='/sign-up'><span className='text-[#4361EE]'>Sign up</span></Link></p>

      </div>

      <div className="h-auto w-full lg:w-[50%] lg:flex items-center justify-center bg-[#F8FAFF] lg:-mt-10 ">
        <img src={signup} alt="Signup" className="max-w-full h-auto" />
      </div>

    </div>

      <Footer/>
    </div>

  );
};

export default Login;
