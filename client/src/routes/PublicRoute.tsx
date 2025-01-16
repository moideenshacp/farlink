import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  // const userPosition = useSelector((state: RootState) => state.user?.user?.position);
  const isOrganizationAdded = useSelector(
    (state: RootState) => state.user?.user?.isOrganizationAdded
  );

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (userRole === "admin" && isAuthenticated) {
    console.log("User is an admin"); // Log when the user role is admin
    if (isOrganizationAdded) {
      console.log("Organization is already added. Navigating to /admin/");
      return <Navigate to="/admin/" replace />;
    } else {
      console.log("Organization is not added. Navigating to /step-1");
      return <Outlet  />;
    }
  }
  // if(userRole === "employee" && userPosition==="HR"){
  //   if(isAuthenticated){
  //     return <Navigate to="/admin/" replace />;

  //   }else{
  //     return <Outlet/>
  //   }
  // }

  if (userRole === "superAdmin") {
    return <Navigate to="/superAdmin/" replace />;
  }
  if(userRole === "employee" ){
    return <Navigate to='/employee/' replace />
  }
  // Default for unknown roles
  return <Navigate to="/" replace />;
};


export default PublicRoute;
