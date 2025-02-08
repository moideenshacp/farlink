import mongoose, { Schema } from "mongoose";
import IchatModel from "../interfaces/IchatModel";

const chatSchema: Schema = new Schema({
  chatType: {
    type: String,
    enum: ["private", "group"],
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  groupName: {
    type: String,
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "message",
  },
  lastSeen: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IchatModel>("chat", chatSchema);
