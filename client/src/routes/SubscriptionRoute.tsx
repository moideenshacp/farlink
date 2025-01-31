import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSubcriptionPlans } from "../api/subcriptionApi";
import { RootState } from "../redux/store";
import { FaSpinner } from "react-icons/fa";

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
        console.log(subscriptionData, "susbcriptionData");

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

  return isSubscribed ? <Outlet /> : <Navigate to="/admin/billing" replace />;
};

export default SubscriptionRoute;
