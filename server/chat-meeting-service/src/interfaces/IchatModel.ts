import mongoose, { Document } from "mongoose";

export default interface IchatModel extends Document {
    chatType:"private" | "group"
    participants:mongoose.Types.ObjectId[]
    groupName:string
    groupAdmin:mongoose.Types.ObjectId
    lastMessage:mongoose.Types.ObjectId
    lastSeen:Date
    createdAt:Date
    updatedAt:Date
}
