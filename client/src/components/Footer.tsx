import { Link } from 'react-router-dom';
import farlink from '../assets/Farlink-bg.png'

const Footer = () => {
  return (
    <footer className="bg-[#2B405A] text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start px-6">
        
        <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <div className="flex items-center justify-between px-16 py-14">
            <img
              src={farlink}
              alt="Logo"
              className="w-14 h-20"
            />
            <h1 className="text-xl font-bold ml-2 text-white">
              FarL<span className="text-[#4361EE]">i</span>nk
            </h1>
          </div>
          <Link to='/sign-up' >

          <button className="bg-[#4361EE] font-medium text-white px-8 py-3 rounded-full ml-16 mt-4 lg:mt-0">
            Create an account
          </button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-28 pt-16 mr-44 lg:mr-44">
          <ul className="text-sm space-y-6 text-center">
            <li className="cursor-pointer hover:text-[#4361EE] transition">Home</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Pricing</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">About Us</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Contact Us</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Blog</li>
          </ul>
          <ul className="text-sm space-y-6 text-center">
            <li className="cursor-pointer hover:text-[#4361EE] transition">Privacy Policy</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Terms Of Service</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Refund Policy</li>
            <li className="cursor-pointer hover:text-[#4361EE] transition">Support</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        © FarLink 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
