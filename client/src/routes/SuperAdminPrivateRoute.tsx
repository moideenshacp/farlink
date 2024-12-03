import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const SuperAdminPrivateRoute = () => {
  const isAuthenticated = useSelector((state:RootState)=>state.user.isAuthenticated)  
  return isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' replace />;
}

export default SuperAdminPrivateRoute