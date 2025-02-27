import axiosInstance from "./axiosInterceptor";

//FETCH SUBSCRIPTION OF ORGANIZATION API=====================================================================================================

export const getSubcriptionPlans = async (
  organizationId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/subcription-service/api/subscription/get-subcriptionDetails`,
      {
        params: { organizationId },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};

//CREATE CUSTOMER PORTAL OF SUBSCRIPTION API=====================================================================================================

export const createCustomerPortalSession = async (
  customerId: string | undefined
): Promise<string> => {
  try {
    const { data } = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/subcription-service/api/subscription/customer-portal-session`,
      { customerId }
    );
    return data.url;
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    throw new Error("Unable to create customer portal session.");
  }
};

//GET PAYMENT HISTORY OF SUBSCRIPTION API=====================================================================================================

export const getPaymentHistory = async (
  customerId: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/subcription-service/api/subscription/payment-history`,
      { params: { customerId } }
    );
    return data;
  } catch (error) {
    console.log("Error fetching payment history:", error);
    throw new Error("Unable to fetch payment history.");
  }
};

//FETCH ALL PAYMENT HISTORY OF COMPANY IN SUPER ADMIN SIDE API=====================================================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllPaymentHistory = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/subcription-service/api/subscription/All-payment-history`
    );
    console.log("dataa from apo", data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to fetch payment history of all..");
  }
};
