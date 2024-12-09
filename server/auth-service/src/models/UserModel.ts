import mongoose, { Schema } from "mongoose";
import IuserModel from "../interfaces/IuserModel";

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "superAdmin", "employee"],
    default: "admin",
  },
  isActive: Boolean,
  verified: {
    type: Boolean,
    default: false,
  },
  isOrganizationAdded:{
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IuserModel>("User", UserSchema);
