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
      type: String,
      enum: ['male', 'female'],
    },
    password: String,
    role: {
      type: String,
      default: "employee",
    },
    dateOfBirth:{
      type:Date
    },
    dateOfJoining:{
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
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    image:{
      type:String
    },
    highestQualification:{
      type:String
    },
    institution:{
      type:String
    },
    qualificationYear:{
      type:String
    },
    fatherName:{
      type:String
    },
    fatherProfession:{
      type:String
    },
    motherName:{
      type:String
    },
    motherProfession:{
      type:String
    }
  });

  export default mongoose.model<IemployeeModel>("Employee", EmployeeSchema);
