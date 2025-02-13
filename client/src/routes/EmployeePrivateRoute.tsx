import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const EmployeePrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  return isAuthenticated && userRole === "employee" ? (
    <Outlet />
  ) : (
    <Navigate to="/employee-login" replace />
  );
};

export default EmployeePrivateRoute;
