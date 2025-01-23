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
  members: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

export default mongoose.model<IprojectModel>("Project", ProjectSchema);
