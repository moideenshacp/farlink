import mongoose, { Schema } from "mongoose";
import IAttendancePolicy from "../interfaces/IpolicyModel";

const AttendancePolicySchema: Schema = new Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  officeStartTime: {
    type: String,
    required: true,
  },
  officeEndTime: {
    type: String,
    required: true,
  },
  lateMarkAfterMinutes: {
    type: Number,
    required: true,
    default: 0,
  },
  halfDayAfterHours: {
    type: Number,
    required: true,
    default: 0,
  },
  totalWorkingHours: {
    type: Number,
    required: true,
    default: 0,
  },
  leaveType: {
    casual: {
      type: Number,
      required: true,
      default: 0,
    },
    sick: {
      type: Number,
      required: true,
      default: 0,
    },
    vacation: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

export default mongoose.model<IAttendancePolicy>(
  "AttendancePolicy",
  AttendancePolicySchema
);
