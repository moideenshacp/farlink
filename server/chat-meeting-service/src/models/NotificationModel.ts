import mongoose, { Schema } from "mongoose";
import InotificationModel from "../interfaces/INotificationModel";

const NotificationSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
  },
  reciever: 
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: { type: Boolean, default: false },
});


export default mongoose.model<InotificationModel>("notification",NotificationSchema)