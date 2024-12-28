export interface Isubcriptionservice {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSubscriptionDetails(organizationId: string | null): Promise<any>;
  createCheckoutSession(
    email: string,
    planId: string,
    plan:  "free" | "MONTHLY" | "YEARLY",
    amount: string,
    organizationId:string
  ): Promise<{ url: string | null }>;
  handleWebhookEvent(
    rawBody: Buffer,
    signature: string | undefined,
    endpointSecret: string | undefined
  ): Promise<void>;
  getSubscriptionDetails(subscriptionId: string): Promise<unknown>;
  createCustomerPortalSession(customerId: string): Promise<string>
  getPaymentHistory(customerId: string): Promise<unknown>

  
}
