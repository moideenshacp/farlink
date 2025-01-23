import mongoose, { Document } from "mongoose";

export default interface IprojectModel extends Document {
  projectName: string;
  projectDescription: string;
  startDate: Date;
  endDate: Date;
  manager: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  organizationId: mongoose.Types.ObjectId;
}
