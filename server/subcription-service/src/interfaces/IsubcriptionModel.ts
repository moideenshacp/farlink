import mongoose, { Document } from "mongoose";

export default interface IsubcriptionModel extends Document {
  _id: string;
  user:mongoose.Types.ObjectId
  organizationId: mongoose.Types.ObjectId;
  subscriptionId: string
}
