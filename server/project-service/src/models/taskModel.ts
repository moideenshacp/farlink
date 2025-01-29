import mongoose, { Schema } from "mongoose";
import ItaskModel from "../interfaces/ItaskModel";

const TaskSchema: Schema = new Schema({
  organizationId:{
    type:mongoose.Types.ObjectId
  },
  projectId:{
    type:mongoose.Types.ObjectId
  },
  taskName: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  priority:{
    type:String,
    enum:["high","medium","low"]
  },
  status:{
    type:String,
    enum:["in_progress","completed"],
    default: "in_progress"
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  file: {
    type: String, 
  },
});

export default mongoose.model<ItaskModel>("task", TaskSchema);
