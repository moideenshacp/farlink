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
    isActive: {
      type:Boolean,
      default:true
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isOrganizationAdded:{
      type: Boolean,
      default: false
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    phone:{
      type:Number,
    },
    firstName:{
      type:String,
    },
    lastName:{
      type:String
    },
    image:{
      type:String
    },
    googleId:{
      type:String
    }
  });

  export default mongoose.model<IuserModel>("User", UserSchema);
