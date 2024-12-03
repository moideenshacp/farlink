import { Document } from "mongoose";

export default interface IuserModel extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "superAdmin" | "employee";
  isActive: boolean;
  verified: boolean;
}
