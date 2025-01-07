import mongoose, { Schema } from "mongoose";
import IattendenceModel from "../interfaces/IattendenceModel";

const AttendanceSchema: Schema = new Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  employeeEmail: {
    type: String,
  },
  checkIn:{
    type:Date
  },
  checkOut:{
    type:Date
  },
  status:{
    type:String,
    enum:['present','absent','late','halfDay','onLeave']
  },
  workingHours:{
    type:Number
  }
});

export default mongoose.model<IattendenceModel>(
  "Attendance",
  AttendanceSchema
);
