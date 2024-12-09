import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const AdminPrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  const isOrganizationAdded = useSelector(
    (state: RootState) => state.user?.user?.isOrganizationAdded
  );

  if (isAuthenticated && userRole === "admin") {
    return isOrganizationAdded ? <Outlet /> : <Navigate to="/step-1" replace />;
  }

  return <Navigate to="/sign-in" replace />;
};


export default AdminPrivateRoute;
