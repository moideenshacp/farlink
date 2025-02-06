import mongoose from "mongoose";

export interface ItaskDetails {
  taskName: string;
  taskDescription: string;
  startDate: Date;
  endDate: Date;
  members: mongoose.Types.ObjectId[];
  projectId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  priority: "high" | "medium" | "low";
  fileUrl?: string;
  status: "in_progress" | "completed";
  parentTaskId?:string |mongoose.Types.ObjectId
}
