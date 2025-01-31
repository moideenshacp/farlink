import mongoose, { Document } from "mongoose";

export default interface ImeetModel extends Document {
  organizationId: mongoose.Types.ObjectId;
  meetTitle: string;
  meetDate: Date;
  meetTime: string | number;
  members: mongoose.Types.ObjectId[];
  meetId: string;
}
