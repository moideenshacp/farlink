import mongoose, { Schema } from "mongoose";
import IsubTaskModel from "../interfaces/IsubTaskModel";

const SubTaskSchema: Schema = new Schema({
  taskName: { type: String},
  taskDescription: { type: String},
  startDate: { type: Date},
  endDate: { type: Date},
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
  },
  status: {
    type: String,
    enum: ["in_progress", "completed"],
    default: "in_progress",
  },
  members: { type: mongoose.Types.ObjectId },
  file: { type: String },
  projectId: { type: mongoose.Types.ObjectId},
  organizationId: { type: mongoose.Types.ObjectId},
  parentTaskId: { type: mongoose.Types.ObjectId},
  feedback:{type:String}
});

export default mongoose.model<IsubTaskModel>("SubTask", SubTaskSchema);
