/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IsubcriptionController } from "../interfaces/IsubcriptionController";
import Stripe from "stripe";
import { Isubcriptionservice } from "../interfaces/IsubcriptionService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export class subcriptionController implements IsubcriptionController {
  private _subcriptionservice: Isubcriptionservice;

  constructor(_subcriptionservice: Isubcriptionservice) {
    this._subcriptionservice = _subcriptionservice;
  }
  public getSubscriptionDetails = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const organizationId = req.query.organizationId as string;
      const companyDetails =
        await this._subcriptionservice.getSubscriptionDetails(organizationId);
      if (companyDetails) {
        res.status(HttpStatusCode.OK).json({
          message: MessageConstants.SUBSCRIPTION_FETCHED,
          companyDetails,
        });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public createCheckoutSession = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email, planId, plan, amount, organizationId } = req.body;
    if (!email || !planId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
      return;
    }

    try {
      const session = await this._subcriptionservice.createCheckoutSession(
        email,
        planId,
        plan,
        amount,
        organizationId
      );
      if (session) {
        res.status(HttpStatusCode.OK).json({ url: session.url });
      }
    } catch (error) {
      console.error("Stripe error:", error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: error });
    }
  };

  public webhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string | undefined;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log("Raw Body Type:", req.body instanceof Buffer ? "Buffer" : typeof req.body); 
    console.log("Raw Body:", req.body);
    try {

      await this._subcriptionservice.handleWebhookEvent(
        req.body,
        sig,
        endpointSecret
      );
      res.status(HttpStatusCode.OK).json({ received: true });
    } catch (err) {
      console.error("Webhook Error:", err);
      res.status(HttpStatusCode.BAD_REQUEST).send(err);
    }
  };
  public createCustomerPortalSession = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const customerId = req.body.customerId as string;
      if (!customerId) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error:MessageConstants.BAD_REQUEST});
        return;
      }

      const url = await this._subcriptionservice.createCustomerPortalSession(
        customerId
      );
      res.status(HttpStatusCode.OK).json({ url });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  };
  public getPaymentHistory = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { customerId } = req.query;
    if (!customerId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
    }

    try {
      const data = await this._subcriptionservice.getPaymentHistory(
        customerId as string
      );
      if (data) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.HISTORY_FETCHED, data });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public getAllPaymentHistory = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const invoices = await stripe.invoices.list({
        limit: 100,
      });

      if (invoices) {
        res.json({ invoices: invoices.data });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error:MessageConstants.INTERNAL_SERVER_ERROR});
    }
  };
}
