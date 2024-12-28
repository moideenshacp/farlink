import mongoose, { Document } from "mongoose";

export default interface IsubcriptionModel extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  subscriptionId: string;
  planId: string;
  amount: string;
  industry: string;
  status?:
    | "active"
    | "past_due"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "unpaid"
    | "initiated"
    | "paused"
    | undefined;
  sessionId: string;
  subscriptionType: "free" | "MONTHLY" | "YEARLY";
  lastPaymentDate: Date;
  customerId: string;
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: Date
  cancelAt: Date | null
  currentPeriodStart : Date

}
