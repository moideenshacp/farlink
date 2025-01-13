import mongoose, { Document } from "mongoose";

export default interface IleaveModel extends Document {
  employeeEmail?: string;
  organizationId?: mongoose.Types.ObjectId;
  startDate?: Date | null;
  endDate?: Date | null;
  status: "pending"| "approved"| "rejected"
  reason?: string;
  leaveType?:"sick" | "casual"| "vacation"
}
