import mongoose, { Schema } from "mongoose";
import IprojectModel from "../interfaces/IprojectModel";

const ProjectSchema: Schema = new Schema({
  organizationId:{
    type:mongoose.Types.ObjectId
  },
  projectName: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  manager: {
    type: mongoose.Types.ObjectId,
  },
  priority:{
    type:String,
    enum:["high","medium","low"]
  },
  status:{
    type:String,
    enum:["planning","in_progress","completed"],
    default: "planning"
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

export default mongoose.model<IprojectModel>("Project", ProjectSchema);
