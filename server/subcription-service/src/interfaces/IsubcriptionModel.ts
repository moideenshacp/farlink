import mongoose, { Document } from "mongoose";

export default interface IsubcriptionModel extends Document {
  _id: string;
  user:mongoose.Types.ObjectId
  admin:mongoose.Types.ObjectId
  organizationId: mongoose.Types.ObjectId;
  subscriptionId: string
  planId: string;
  amount: string;
  industry:string
  status: "initiated"|"active"|"cancelled"
  sessionId: string;
  subscriptionType:"free" | "MONTHLY" |"YEARLY"
  lastPaymentDate:Date
  customerId:string
}
