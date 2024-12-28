import { Request, Response } from "express";
import { IsubcriptionController } from "../interfaces/IsubcriptionController";
import { subcriptionService } from "../services/subcriptionService";



export class subcriptionController implements IsubcriptionController {
  private _subcriptionservice: subcriptionService;

  constructor() {
    this._subcriptionservice = new subcriptionService();
  }
  public getSubscriptionDetails = async(req: Request, res: Response): Promise<void>=> {
      try {

        console.log("-----------------------------------------------------------------------------------------------------");
        
        const organizationId = req.query.organizationId as string;         
        const companyDetails = await this._subcriptionservice.getSubscriptionDetails(organizationId)
        if(companyDetails){

          res.status(200).json({message:"sucessfully fetch subcription plans",companyDetails})
        }else{
          res.status(400).json({message:"No subscription data found"})
        }
      } catch (error) {
        console.log(error);
        
      }
  }

  public createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    const { email, planId, plan, amount ,organizationId} = req.body;
    console.log("Request received in createCheckoutSession:", req.body);

    if (!email || !planId) {
       res.status(400).json({ error: "Missing email or planId" });
       return
    }

    try {
      const session = await this._subcriptionservice.createCheckoutSession(
        email,
        planId,
        plan,
        amount,
        organizationId
      );
      if(session){

        res.status(200).json({ url: session.url });
      }
    } catch (error) {
      console.error("Stripe error:", error);
      res.status(400).json({ error: error });
    }
  };
  
  public webhook = async (req: Request, res: Response): Promise<void> => {
    console.log("Webhook received");

    const sig = req.headers["stripe-signature"] as string | undefined;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      await this._subcriptionservice.handleWebhookEvent(
        req.body,
        sig,
        endpointSecret
      );
      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Webhook Error:", err);
      res.status(400).send(err);
    }
  };
  public createCustomerPortalSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerId = req.body.customerId as string;
      if (!customerId) {
        res.status(400).json({ error: "Customer ID is required" });
        return;
      }
  
      const url = await this._subcriptionservice.createCustomerPortalSession(customerId);
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getPaymentHistory = async (req: Request, res: Response): Promise<any> => {
    const { customerId } = req.query;
    console.log("get in history");
    
    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }
  
    try {

      const data = await this._subcriptionservice.getPaymentHistory(customerId as string)
      if(data){
        console.log("histroy",data);
        
        res.status(200).json({message:"history fetched successfully",data});
      }else{
        res.status(400).json({message:"No data found"})
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ error: "Unable to fetch payment history" });
    }
  };
  
}
