/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

export interface IsubcriptionController {
  getSubscriptionDetails(req: Request, res: Response): Promise<void>;
  createCheckoutSession(req: Request, res: Response): Promise<void>;
  webhook(req: Request, res: Response): Promise<void>;
  createCustomerPortalSession(req: Request, res: Response): Promise<void>;
  getPaymentHistory(req: Request, res: Response): Promise<any>
  getAllPaymentHistory(req: Request, res: Response): Promise<any>
}
