import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const OrganizationPrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (userRole === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
};

export default OrganizationPrivateRoute;
