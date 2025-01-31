import mongoose, { Schema } from "mongoose";
import ImeetModel from "../interfaces/ImeetModel";

const meetSchema: Schema = new Schema(
  {
    organizationId: {
      type: mongoose.Schema.ObjectId,
    },
    meetTitle: {
      type: String,
    },
    meetDate: {
      type: Date,
    },
    meetTime: {
      type: String,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    meetId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ImeetModel>("meeting", meetSchema);
