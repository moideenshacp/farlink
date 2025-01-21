import mongoose, { Document } from "mongoose";

export default interface IattendenceModel extends Document {
  employeeEmail?: string;
  organizationId?: mongoose.Types.ObjectId;
  checkIn?: Date | null;
  checkOut?: Date | null;
  status: 'present' | 'absent' | 'late'| 'halfDay' | 'onLeave'
  workingHours?: number;
  date:Date | null
}
