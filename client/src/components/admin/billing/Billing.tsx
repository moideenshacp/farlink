import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import SubscriptionCard from "./SubcriptionCard";
import { getSubcriptionPlans } from "../../../api/subcriptionApi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import PaymentHistory from "./PaymentHistory";
import Shimmer from "./ShimmerCard";

const benefits = [
  "Unlimited video conference",
  "Unlimited end-to-end chatting",
  "Add unlimited employees",
  "Get-unlimited features!",
];

const Billing = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubcription = async () => {
      try {
        setIsLoading(true);
        if (user?.organizationId) {
          const res = await getSubcriptionPlans(user?.organizationId);
          if (res.data) {
            setSubscriptionDetails(res.data.companyDetails);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcription();
  }, [user?.organizationId]);

  const formattedDate = subscriptionDetails?.current_period_end
    ? new Date(subscriptionDetails.current_period_end).toLocaleDateString()
    : "";
  const buttonText =
    subscriptionDetails?.plan === undefined
      ? "Upgrade Your Plan"
      : "Manage Your Plan";

  const fallbackSubscriptionDetails = {
    plan: "FREE",
    amount: 0,
    current_period_end: "",
    current_period_start: "",
    cancel_at_period_end: false,
    activeStatus: "Active",
  };

  const displaySubscriptionDetails =
    subscriptionDetails || fallbackSubscriptionDetails;

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row gap-20 w-full max-w-4xl">
          {isLoading ? (
            <div className="flex-1">
              <Shimmer />
            </div>
          ) : (
            <>
              <div className="flex-1">
                <SubscriptionCard
                  planName={displaySubscriptionDetails.plan}
                  icon="🚀"
                  date={
                    displaySubscriptionDetails.plan !== "FREE"
                      ? formattedDate
                      : undefined
                  }
                  activeStatus={
                    displaySubscriptionDetails.status
                      ? displaySubscriptionDetails.status
                      : "Active"
                  }
                  customerId={displaySubscriptionDetails.customerId}
                  buttonText={buttonText}
                />
              </div>
              {displaySubscriptionDetails.plan !== "FREE" && (
                <div className="flex-1">
                  <PricingCard
                    price={displaySubscriptionDetails.amount}
                    date={formattedDate}
                    benefits={benefits}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {!isLoading && (
          <>
            <br />
            <PaymentHistory
              customerId={displaySubscriptionDetails.customerId}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Billing;
