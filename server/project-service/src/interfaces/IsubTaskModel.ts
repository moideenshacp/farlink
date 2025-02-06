import mongoose, { Document } from "mongoose";

export default interface IsubTaskModel extends Document {
  taskName: string;
  taskDescription: string;
  startDate: Date;
  endDate: Date;
  priority: "high" | "medium" | "low";
  status: "in_progress" | "completed";
  members: mongoose.Types.ObjectId
  file?: string;
  projectId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  parentTaskId: mongoose.Types.ObjectId;
}
