import mongoose, { Schema } from "mongoose";
import IleaveModel from "../interfaces/IleaveModel";

const LeaveSchema: Schema = new Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  employeeEmail: {
    type: String,
  },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "vacation"],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default:"pending",
  },
});

export default mongoose.model<IleaveModel>("Leave", LeaveSchema);
