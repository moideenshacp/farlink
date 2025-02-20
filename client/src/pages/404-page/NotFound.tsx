import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/EmailLogo.png";
import Footer from '../../shared/components/landingPageComponents/Footer';

interface NotFoundProps {
  routeType?: 'admin' | 'employee' | 'superadmin';
}

const NotFound: React.FC<NotFoundProps> = ({ routeType }) => {
  const location = useLocation();
  
  // Determine route type from either props or current path
  const getRouteType = () => {
    if (routeType) return routeType;
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/employee')) return 'employee';
    if (location.pathname.startsWith('/superAdmin')) return 'superadmin';
    return null;
  };

  const currentRouteType = getRouteType();

  // Get redirect path and button text based on route type
  const getRedirectInfo = () => {
    switch (currentRouteType) {
      case 'admin':
        return { path: '/admin', text: 'Back to Dashboard' };
      case 'employee':
        return { path: '/employee', text: 'Back to Dashboard' };
      case 'superadmin':
        return { path: '/superAdmin', text: 'Back to Dashboard' };
      default:
        return { path: '/', text: 'Back to Homepage' };
    }
  };

  const { path, text } = getRedirectInfo();

  return (
    <div>
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <img
          src={logo}
          alt="FarLink Logo"
          className="w-64"
        />
        
        {/* 404 with Character */}
        <div className="relative flex items-center justify-center mb-8">
          {/* First 4 */}
          <span className="text-[120px] font-bold text-violet-600">4</span>
          
          {/* 0 with character */}
          <div className="relative mx-2">
            {/* Zero */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                {/* Eyes */}
                <div className="w-8 h-3 flex justify-between">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
            {/* Small character on top */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 flex flex-col items-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-4 bg-gray-800"></div>
              </div>
            </div>
          </div>
          
          {/* Second 4 */}
          <span className="text-[120px] font-bold text-violet-600">4</span>
          
          {/* Decorative dots */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          </div>
        </div>
        
        {/* Text */}
        <h2 className="text-2xl font-semibold mb-3">Oops!</h2>
        <p className="text-gray-600 mb-6">We can't seem to find the page you are looking for</p>
        
        {/* Button */}
        <Link 
          to={path}
          className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
        >
          {text}
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;