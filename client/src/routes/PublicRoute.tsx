import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  console.log("roleeeeeeeeeeeeeeee", userRole);
  if (!isAuthenticated) {
    return <Outlet />;
  }
  if (isAuthenticated && userRole === "admin") {
    console.log("keriiiii");

    return <Navigate to="/admin/" replace />;
  }
  if (isAuthenticated && userRole === "superAdmin") {
    console.log("getetetet");

    return <Navigate to="/superAdmin/" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
