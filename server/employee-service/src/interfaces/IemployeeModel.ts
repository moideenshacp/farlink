import mongoose, { Document } from "mongoose";

export default interface IemployeeModel extends Document {
  _id: string;
  userName:string,
  firstName:string,
  lastName:string,
  email: string;
  phone:string,
  position:string,
  gender:string,
  password: string;
  role: "employee";
  isActive: boolean;
  DOB:Date,
  hiringDate:Date,
  street:string,
  city:string,
  country:string,
  state:string,
  zipcode:string,
  verified: boolean;
  organizationId: mongoose.Types.ObjectId;
}
