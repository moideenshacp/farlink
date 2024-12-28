import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInterceptor";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createCustomerPortalSession } from "../../../api/subcriptionApi";

type SubscriptionCardProps = {
  planName: string;
  icon: string;
  date?: string;
  buttonText: string;
  activeStatus: string;
  customerId: string
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  planName,
  icon,
  date,
  buttonText,
  activeStatus,
  customerId
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleUpgradeClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const { user } = useSelector((state: RootState) => state.user);
  const handleManagePlan = async () => {
    if (!user) {
      console.error("User not found!");
      return;
    }

    try {
      const url = await createCustomerPortalSession(customerId);
      window.location.href = url;
    } catch (error) {
      console.error("Error redirecting to customer portal:", error);
    }
  };

  const handleUpgrade = async (
    planId: string,
    amount: string,
    plan: string
  ) => {
    if (!user) {
      console.error("User not found!");
      return;
    }
    try {
      const { data } = await axiosInstance.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/subcription-service/api/subscription/create-checkout-session`,
        {
          email: user?.email,
          planId,
          organizationId: user?.organizationId,
          amount,
          plan,
        }
      );

      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#4361EE] text-white rounded-lg shadow-md p-6 sm:flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Current Subscription Plan:
          </h3>
          <p className="text-xl font-bold mb-1 text-yellow-200">
            {icon} {planName}
          </p>
          <h5 className="mt-4 text-yellow-200">
            Subscription Status: {activeStatus}
          </h5>
          <br />

          {date ? (
            <>
              Premium monthly subscription plan active since:{" "}
              <span className="font-medium">{date}</span>
            </>
          ) : (
            <>
              Basic features <br />
              Limited access to tools <br />
              <br />
              Want more? Upgrade to unlock premium tools and priority support!👉
            </>
          )}
        </div>

        <button
          className="bg-white mt-5 text-black text-sm items-center px-8 py-2 rounded-lg font-medium"
          onClick={planName !== "FREE" ? handleManagePlan : handleUpgradeClick}
        >
          {buttonText}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
            <h2 className="text-2xl font-bold text-center mb-8">
              Choose your plan!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Plan 2 */}
              <div className="text-center border p-6 rounded-lg shadow-md">
                <h3 className="text-4xl font-bold mb-4">₹199</h3>
                <p className="text-sm text-gray-500 mb-4">Per Month</p>
                <h4 className="text-lg font-semibold mb-4">Premium Plan</h4>
                <p className="text-sm text-gray-600">
                  Great choice starts here! Select a plan that fits your needs:
                  Monthly for flexibility, or Yearly for unbeatable value. Your
                  journey to convenience begins now!
                </p>
                <button
                  onClick={() => {
                    handleUpgrade(
                      "price_1QaVGACc8hYAsEPixnQU5I6C",
                      "199",
                      "MONTHLY"
                    );
                  }}
                  className="bg-blue-500 text-white mt-6 px-6 py-2 rounded-lg font-medium"
                >
                  Choose Plan!
                </button>
              </div>

              {/* Plan 3 */}
              <div className="text-center border p-6 rounded-lg shadow-md">
                <h3 className="text-4xl font-bold mb-4">₹2100</h3>
                <p className="text-sm text-gray-500 mb-4">Per Year</p>
                <h4 className="text-lg font-semibold mb-4">Premium Plan</h4>
                <p className="text-sm text-gray-600">
                  Great choice starts here! Select a plan that fits your needs:
                  Monthly for flexibility, or Yearly for unbeatable value. Your
                  journey to convenience begins now!
                </p>
                <button
                  onClick={() => {
                    handleUpgrade(
                      "price_1QaVGzCc8hYAsEPi8pMwt4go",
                      "2100",
                      "YEARLY"
                    );
                  }}
                  className="bg-blue-500 text-white mt-6 px-6 py-2 rounded-lg font-medium"
                >
                  Choose Plan!
                </button>
              </div>
            </div>
            <button
              className="mt-8 bg-gray-200 px-6 py-2 rounded-lg block mx-auto"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
