import { useState } from 'react';
import logo from '../assets/farlink.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white fixed w-full">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <h1 className="text-xl font-bold -ml-2 text-[#172C56]">
          FarL<span className="text-[#4361EE]">i</span>nk
        </h1>
      </div>

      <div className="hidden md:flex items-center space-x-12">
        <ul className="flex space-x-8 text-gray-800">
          <Link to='/'>
          <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Home</li>
          </Link>
          <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">About Us</li>
          <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Contact Us</li>
          <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Pricing</li>
          <Link to='/login'>
          <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Login</li>
          </Link>
        </ul>
        <Link to='/sign-up'>
        <button className="bg-[#4361EE] font-medium text-white px-7 py-3 rounded-full text-sm hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#172C56] focus:outline-none"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-800">
            <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Home</li>
            <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">About Us</li>
            <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Contact Us</li>
            <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Pricing</li>
            <li className="text-[#172C56] font-semibold cursor-pointer hover:text-[#4361EE]">Login</li>
          </ul>
          <div className="flex justify-center pb-4">
            <button className="bg-[#4361EE] font-medium text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
