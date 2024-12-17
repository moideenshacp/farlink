  import mongoose, { Schema } from "mongoose";
  import IemployeeModel from "../interfaces/IemployeeModel";

  const EmployeeSchema: Schema = new Schema({
    userName: String,
    firstName:{
      type:String,
    },
    lastName:{
      type:String
    },
    email: { type: String, unique: true },
    phone:{
      type:String,
    },
    position:{
      type:String,
    },
    gender:{
      type:String
    },
    password: String,
    role: {
      type: String,
      default: "employee",
    },
    DOB:{
      type:Date
    },
    hiringDate:{
      type:Date
    },
    street:{
      type:String
    },
    city:{
      type:String
    },
    country:{
      type:String
    },
    state:{
      type:String,
    },
    zipcode:{
      type:String
    },
    isActive: {
      type:Boolean,
      default:true
    },
    verified: {
      type: Boolean,
      default: false,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  export default mongoose.model<IemployeeModel>("Employee", EmployeeSchema);
