import mongoose, { Document } from "mongoose";

export default interface IorgModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  industry: string;
  subscriptionType: "free" | "premium";
  admin: mongoose.Types.ObjectId;

}
