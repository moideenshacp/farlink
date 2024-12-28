import mongoose, { Schema } from "mongoose";
import IsubcriptionModel from "../interfaces/IsubcriptionModel";

const subcriptionSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },  
  admin: {
    type: mongoose.Schema.Types.ObjectId,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  
  customerId: {
    type: String,
  },
  subscriptionType: {
    type: String,
    enum: ["free", "MONTHLY","YEARLY"],
    default: "free",
  },
  industry: String,
  sessionId:{
    type:String
  },
  subscriptionId:{
    type:String
  },
  status:{
    type:String,
    enum:["initiated","active","cancelled"]
  },
  lastPaymentDate:{
    type:Date
  },
  amount:{
    type:String
  }
});

export default mongoose.model<IsubcriptionModel>(
  "Subcription",
  subcriptionSchema
);
