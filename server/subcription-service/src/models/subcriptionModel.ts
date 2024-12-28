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
    enum: ["free", "MONTHLY", "YEARLY"],
    default: "free",
  },
  industry: String,
  sessionId: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "active",
      "past_due",
      "canceled",
      "incomplete",
      "incomplete_expired",
      "trialing",
      "unpaid",
      "initiated",
      "paused",
    ],
  },
  lastPaymentDate: {
    type: Date,
  },
  amount: {
    type: String,
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  currentPeriodEnd: {
    type: Date,
  },
  cancelAt: {
    type: Date,
  },
  currentPeriodStart: {
    type: Date,
  }
  
});

export default mongoose.model<IsubcriptionModel>(
  "Subcription",
  subcriptionSchema
);
