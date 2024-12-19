import mongoose, { Document } from "mongoose";
import IorgModel from "./IorganizationModel";

export default interface IuserModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "superAdmin" | "employee";
  isActive: boolean;
  verified: boolean;
  isOrganizationAdded: boolean
  firstName:string
  lastName:string
  phone:string
  image:string
  organizationId: IorgModel | mongoose.Types.ObjectId;
}
