import Stripe from "stripe";
import { Isubcriptionservice } from "../interfaces/IsubcriptionService";
import IsubcriptionModel from "../interfaces/IsubcriptionModel";
import mongoose from "mongoose";
import IsubcriptionRepository from "../interfaces/IsubcriptionRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export class subcriptionService implements Isubcriptionservice {
  private _subcriptionRepository: IsubcriptionRepository;

  constructor(_subcriptionRepository: IsubcriptionRepository) {
    this._subcriptionRepository = _subcriptionRepository
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSubscriptionDetails(organizationId: string | null): Promise<any> {
    try {
      if (!organizationId) {
        throw new Error("organizationId cannot be null or undefined");
      }
      console.log(organizationId);

      await this._subcriptionRepository.findByOrganizationId(organizationId);

      const subcription =
        await this._subcriptionRepository.findActiveSubscription(
          organizationId
        );

      if (!subcription) {
        console.log("No subscription data");
        return;
      }
      const subscriptionId = subcription?.subscriptionId;
      const stripeSubscription = await stripe.subscriptions.retrieve(
        subscriptionId
      );
      const customerId = stripeSubscription.customer as string;
      if (!subcription.customerId) {
        await this._subcriptionRepository.update(
          { organizationId: new mongoose.Types.ObjectId(organizationId) },
          { customerId }
        );
      }
      let planName: unknown;
      let planAmount: number | null = null;
      if (
        stripeSubscription.items &&
        stripeSubscription.items.data.length > 0
      ) {
        const subscriptionItem = stripeSubscription.items.data[0];
        const plan = subscriptionItem.plan;

        if (plan && plan.amount != null) {
          planAmount = plan.amount / 100;
          if (planAmount === 2100) {
            planName = "Premium (yearly)";
          } else if (planAmount === 199) {
            planName = "Premium (monthly)";
          } else {
            planName = "FREE";
          }
          console.log("Plan planAmount in INR: ", planAmount);
        } else {
          console.log("Plan or amount is null");
        }
      } else {
        console.log("No items in this subscription.");
      }

      return {
        plan: planName,
        amount: planAmount,
        status: stripeSubscription.status,
        customerId: subcription.customerId,
        current_period_end: new Date(
          stripeSubscription.current_period_end * 1000
        ),
        current_period_start: new Date(
          stripeSubscription.current_period_start * 1000
        ),
        cancel_at_period_end: stripeSubscription.cancel_at_period_end,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createCheckoutSession(
    email: string,
    planId: string,
    plan: "free" | "MONTHLY" | "YEARLY",
    amount: string,
    organizationId: string
  ): Promise<{ url: string | null }> {
    try {
      console.log(plan, amount);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: email,
        line_items: [{ price: planId, quantity: 1 }],
        success_url: `${process.env.FRONT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:3000/cancel",
        subscription_data: {
          metadata: { plan },
        },
        metadata: { plan }, 
      });

      const subcriptionData: Partial<IsubcriptionModel> = {
        planId,
        amount,
        status: "initiated",
        sessionId: session.id,
      };
      console.log(subcriptionData,"123");
      
      const updatedSub = await this._subcriptionRepository.update(
        { organizationId: new mongoose.Types.ObjectId(organizationId) },
        subcriptionData
      );
      if (updatedSub) {
        console.log("updated");
      } else {
        console.log("uupdation failed");
      }

      return { url: session.url };
    } catch (error) {
      console.log(error);
      throw new Error("Error creating checkout session");
    }
  }
  async handleWebhookEvent(
    rawBody: Buffer,
    signature: string | undefined,
    endpointSecret: string | undefined
  ): Promise<void> {
    if (!signature) {
      throw new Error("Missing Stripe signature.");
    }

    if (!endpointSecret) {
      throw new Error("Missing Stripe webhook secret.");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret
      );
      console.log("Verified event:", event);

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("Checkout session completed:");
          const subscriptionId = session.subscription as string;

          const updated = await this._subcriptionRepository.update(
            { sessionId: session.id },
            {
              status: "active",
              subscriptionId: subscriptionId,
              subscriptionType: session.metadata?.plan as
                | "free"
                | "MONTHLY"
                | "YEARLY",
            }
          );

          if (updated) {
            console.log(
              "Subscription updated successfully after checkout.session.completed."
            );
          } else {
            console.log(
              "Failed to update subscription after checkout.session.completed."
            );
          }
          break;
        }
        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          console.log("Payment succeeded:");
          const subscriptionId = invoice.subscription as string;

          const updated = await this._subcriptionRepository.update(
            { subscriptionId: subscriptionId },
            { lastPaymentDate: new Date() }
          );

          if (updated) {
            console.log("Last payment date updated successfully.");
          } else {
            console.log("Failed to update last payment date.");
          }
          break;
        }
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          console.log("Subscription updated:");

          const subscriptionId = subscription.id;
          const status = subscription.status;
          
          const cancelAtPeriodEnd = subscription.cancel_at_period_end;
          const currentPeriodEnd = new Date(
            subscription.current_period_end * 1000
          );
          const cancelAt = subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null;
            const subscriptionType =(subscription.metadata?.plan as "free" | "MONTHLY" | "YEARLY") || "free";

    console.log("Extracted subscriptionType:", subscriptionType);
          const updated = await this._subcriptionRepository.update(
            { subscriptionId: subscriptionId },
            {
              status: status,
              cancelAtPeriodEnd: cancelAtPeriodEnd,
              currentPeriodEnd: currentPeriodEnd,
              cancelAt: cancelAt,
              subscriptionType:subscriptionType
            }
          );

          if (updated) {
            console.log("Subscription updated successfully in the database.");
          } else {
            console.log("Failed to update subscription in the database.");
          }
          break;
        }
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          console.log("Subscription canceled:");
          const subscriptionId = subscription.id;

          const existingSubscription =
            await this._subcriptionRepository.findBySubscriptionId(
              subscriptionId
            );

          const subscriptionType =
            existingSubscription?.subscriptionType || "free";

          const updated = await this._subcriptionRepository.update(
            { subscriptionId: subscriptionId },
            {
              status: "canceled",
              subscriptionType: subscriptionType,
            }
          );

          if (updated) {
            console.log("Subscription cancelled successfully.");
          } else {
            console.log("Failed to cancel subscription.");
          }
          break;
        }

        default:
          console.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      console.error("Webhook error:", err);
      throw new Error(`Webhook Error: ${err}`);
    }
  }

  async createCustomerPortalSession(customerId: string): Promise<string> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.FRONT_URL + "/admin/billing",
      });
      return session.url;
    } catch (error) {
      console.error("Error creating customer portal session:", error);
      throw new Error("Could not create customer portal session");
    }
  }
  async getPaymentHistory(customerId: string): Promise<unknown> {
    try {
      const invoices = await stripe.invoices.list({
        customer: customerId as string,
        limit: 10,
      });

      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId as string,
        limit: 10,
      });
      return {
        invoices: invoices.data,
        paymentIntents: paymentIntents.data,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
