import { Request, Response } from "express";

export interface IsubcriptionController {
  getSubscriptionDetails(req: Request, res: Response): Promise<void>;
  createCheckoutSession(req: Request, res: Response): Promise<void>;
  webhook(req: Request, res: Response): Promise<void>;
  createCustomerPortalSession(req: Request, res: Response): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaymentHistory(req: Request, res: Response): Promise<any>
}
