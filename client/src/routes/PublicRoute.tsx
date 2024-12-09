import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  const isOrganizationAdded = useSelector(
    (state: RootState) => state.user?.user?.isOrganizationAdded
  );

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (userRole === "admin") {
    return isOrganizationAdded ? (
      <Navigate to="/admin/" replace />
    ) : (
      <Navigate to="/step-1" replace />
    );
  }

  if (userRole === "superAdmin") {
    return <Navigate to="/superAdmin/" replace />;
  }

  // Default for unknown roles
  return <Navigate to="/" replace />;
};


export default PublicRoute;
