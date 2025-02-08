import mongoose, { Schema } from "mongoose";
import ImessageModel from "../interfaces/ImessageModel";

const messageSchema: Schema = new Schema({
  content: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  readBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ImessageModel>("message", messageSchema);
