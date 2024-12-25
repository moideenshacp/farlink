import mongoose, { Schema } from "mongoose";
import IsubcriptionModel from "../interfaces/IsubcriptionModel";
import { timeStamp } from "console";

const subcriptionSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  subcriptionId: {
    type: String,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_at: {
    type: timeStamp,
  },
});

export default mongoose.model<IsubcriptionModel>(
  "Subcription",
  subcriptionSchema
);
