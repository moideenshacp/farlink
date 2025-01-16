import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const AdminPrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  // const userPosition = useSelector((state: RootState) => state.user?.user?.position);
  const isOrganizationAdded = useSelector(
    (state: RootState) => state.user?.user?.isOrganizationAdded
  );

  if (isAuthenticated && userRole === "admin") {
    console.log("yes it is added");
    
    return isOrganizationAdded ? <Outlet /> : <Navigate to="/step-1" replace />;
  }
  // if(userRole === "employee" && userPosition === "HR"){
  //   console.log("employee hr aan");
    
  //   return isAuthenticated ? <Outlet/> : <Navigate to="/step-1" replace /> ;

  // }

  return <Navigate to="/sign-in" replace />;
};


export default AdminPrivateRoute;
