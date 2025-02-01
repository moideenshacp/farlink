import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSubcriptionPlans } from "../api/subcriptionApi";
import { RootState } from "../redux/store";
import { FaSpinner } from "react-icons/fa";
import { Modal } from "antd";

const SubscriptionRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (!user?.organizationId) {
          setIsSubscribed(false);
          setIsLoading(false);
          return;
        }

        const response = await getSubcriptionPlans(user.organizationId);
        const subscriptionData = response.data.companyDetails;

        if (
          subscriptionData &&
          subscriptionData.status === "active" &&
          subscriptionData.plan !== "FREE"
        ) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
        setIsSubscribed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex mt-[20%] justify-center items-center py-4">
        <FaSpinner className="text-blue-500 animate-spin text-3xl" />
      </div>
    );
  }

  if (!isSubscribed) {
    if (user?.role !== "admin") {
      Modal.warning({
        title: "Subscription Required",
        content: "Your organization needs an active subscription to access this section. Please contact your admin.",
        centered: true,
      });
      return <Navigate to="/employee/" replace />;
    }
    return <Navigate to="/admin/billing" replace />;
  }

  return <Outlet />;
};

export default SubscriptionRoute;
