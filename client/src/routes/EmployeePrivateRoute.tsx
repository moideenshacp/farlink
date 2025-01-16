import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const EmployeePrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  const userPosition = useSelector(
    (state: RootState) => state.user?.user?.position
  );

  console.log("admin route");

  if (isAuthenticated && userRole === "employee") {
    if (userPosition === "HR") {
        console.log("hr aaaaaaaaaaaaaaaaaaaaaaaaaaaan");
        
      return <Outlet />;
    }
    return <Navigate to="/employee/" replace />;
  }

  return <Navigate to="/sign-in" replace />;
};

export default EmployeePrivateRoute;
