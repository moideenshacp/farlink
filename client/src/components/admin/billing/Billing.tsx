import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import SubscriptionCard from "./SubcriptionCard";
import { getSubcriptionPlans } from "../../../api/subcriptionApi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import PaymentHistory from "./PaymentHistory";

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
          console.log(res.data.companyDetails.plan);

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

  console.log(subscriptionDetails, "fghjkdfgh");
  const formattedDate = subscriptionDetails?.current_period_end
    ? new Date(subscriptionDetails.current_period_end).toLocaleDateString()
    : "";
  const buttonText =
    subscriptionDetails?.plan !== "free" ? "Manage Your Plan" : "Upgrade Plans";

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
          {isLoading ? ( // Show loader when isLoading is true
            <div className="flex items-center justify-center w-full h-32">
              <div className="loader"></div>{" "}
              Loading...
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
      </div>
      <br />
      <PaymentHistory customerId={displaySubscriptionDetails.customerId} />

    </div>
  );
};

export default Billing;
