import mongoose, { Document } from "mongoose";

export default interface ItaskModel extends Document {
  tasktName: string;
  tasktDescription: string;
  startDate: Date;
  endDate: Date;
  members: mongoose.Types.ObjectId[];
  organizationId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  priority:"high" | "medium" | "low"
  status:"in_progress"|"completed"
  fileUrl?: string;

}
