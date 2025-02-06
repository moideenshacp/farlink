import mongoose, { Document } from "mongoose";

export default interface IAttendancePolicyModel extends Document {
  organizationId?: mongoose.Types.ObjectId;
  officeStartTime?: string | number;
  officeEndTime?: string | number;
  lateMarkAfterMinutes?: number | string;
  halfDayAfterHours?: number | string;
  totalWorkingHours?: number | string;
  leaveType: {
    casual: string | number;
    sick: string | number;
    vacation: string | number;
}
holidayDays?:number[]


}
