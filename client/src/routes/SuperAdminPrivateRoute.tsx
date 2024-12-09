import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const SuperAdminPrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  return isAuthenticated && userRole === "superAdmin" ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default SuperAdminPrivateRoute;
